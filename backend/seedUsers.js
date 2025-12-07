const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedUsers = [
    {
        name: 'Admin User',
        email: 'admin@allcode.com',
        password: 'admin123',
        role: 'admin',
        isApproved: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'student123',
        role: 'student',
        isApproved: true
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'instructor123',
        role: 'instructor',
        isApproved: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/allcode');
        console.log('MongoDB connected for user seeding');

        await User.deleteMany({});
        console.log('Cleared existing users');

        await User.insertMany(seedUsers);
        console.log('Users seeded successfully!');
        console.log(`Total users created: ${seedUsers.length}`);
        console.log('\nUser credentials:');
        seedUsers.forEach(user => {
            console.log(`- ${user.role}: ${user.email} / ${user.password}`);
        });
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
