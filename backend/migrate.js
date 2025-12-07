const mongoose = require('mongoose');

// --- CONFIGURATION ---
// 1. Your Local Database (Where data is NOW)
const LOCAL_URI = 'mongodb://127.0.0.1:27017/allcode';

// 2. Your Atlas Database (Where data should GO)
const ATLAS_URI = 'mongodb+srv://divahar:Diva%402004@cluster0.vpcri2z.mongodb.net/?appName=Cluster0';
// ---------------------

async function migrateData() {
    console.log("🚀 Starting Data Migration...");

    // Step 1: Connect to LOCAL and fetch all data
    console.log("📥 Connecting to LOCAL database...");
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log("✅ Connected to Local.");

    // We will migrate these specific collections
    const collectionsToMigrate = ['courses', 'users', 'batches'];
    const allData = {};

    for (const name of collectionsToMigrate) {
        try {
            // Fetch everything from this collection
            const data = await localConn.collection(name).find({}).toArray();
            console.log(`   Found ${data.length} items in '${name}'.`);
            allData[name] = data;
        } catch (err) {
            console.log(`   ⚠️ Could not read '${name}':`, err.message);
            allData[name] = [];
        }
    }

    await localConn.close(); // Close local connection

    // Step 2: Connect to ATLAS and insert data
    console.log("\n📤 Connecting to ATLAS database...");
    const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log("✅ Connected to Atlas.");

    for (const name of collectionsToMigrate) {
        const items = allData[name];
        if (items.length > 0) {
            try {
                // Use ordered: false so duplicates don't stop the whole process
                const result = await atlasConn.collection(name).insertMany(items, { ordered: false });
                console.log(`   ✅ Successfully uploaded ${result.insertedCount} items to '${name}' in Atlas.`);
            } catch (err) {
                if (err.code === 11000) {
                    console.log(`   ℹ️ '${name}' had duplicates (skipped them).`);
                } else {
                    console.log(`   ❌ Error uploading '${name}':`, err.message);
                }
            }
        } else {
            console.log(`   No items to upload for '${name}'.`);
        }
    }

    await atlasConn.close();
    console.log("\n🎉 Migration Complete!");
}

migrateData().catch(console.error);
