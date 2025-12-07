const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/allcode';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Ensure temp directory exists
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');
const batchesRouter = require('./routes/batches');

// Routes
app.get('/', (req, res) => {
    res.send("API is Running Successfully");
});

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
app.use('/api/batches', batchesRouter);

app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello from AllCode API" });
});

app.post('/api/run', (req, res) => {
    const { language, code, input } = req.body;

    let filename;
    let command;
    const timestamp = Date.now();

    // Create input file if needed
    const inputFile = path.join(tempDir, `input_${timestamp}.txt`);
    fs.writeFileSync(inputFile, input || '');

    if (language === 'python') {
        filename = path.join(tempDir, `temp_${timestamp}.py`);
        fs.writeFileSync(filename, code);
        command = `python "${filename}" < "${inputFile}"`;
    } else if (language === 'javascript') {
        filename = path.join(tempDir, `temp_${timestamp}.js`);
        fs.writeFileSync(filename, code);
        command = `node "${filename}" < "${inputFile}"`;
    } else if (language === 'java') {
        // For Java, class name must match filename. We assume 'Main' class.
        filename = path.join(tempDir, 'Main.java');
        fs.writeFileSync(filename, code);
        // Compile then run. Classpath set to tempDir
        command = `javac "${filename}" && java -cp "${tempDir}" Main < "${inputFile}"`;
    } else {
        return res.status(400).json({ output: "Unsupported language" });
    }

    exec(command, (error, stdout, stderr) => {
        // Cleanup files
        try {
            if (fs.existsSync(filename)) fs.unlinkSync(filename);
            if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
            // Cleanup class file for Java
            if (language === 'java') {
                const classFile = path.join(tempDir, 'Main.class');
                if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
            }
        } catch (e) {
            console.error("Error cleaning up files:", e);
        }

        if (error) {
            // Return stderr if execution failed (compilation error, runtime error)
            return res.json({ output: stderr || error.message });
        }
        res.json({ output: stdout });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
