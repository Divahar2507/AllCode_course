const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/allcode';

mongoose.connect(mongoURI).then(async () => {
    const courses = await Course.find();
    courses.forEach(c => {
        console.log(`Course: ${c.title} (${c.type})`);
        c.modules.forEach(m => {
            console.log(`  Module: ${m.title}`);
            m.topics.forEach(t => {
                console.log(`    Topic: ${t.title} [${t.type}] (Content Len: ${t.content ? t.content.length : 0})`);
            });
        });
    });
    mongoose.disconnect();
}).catch(e => console.error(e));
