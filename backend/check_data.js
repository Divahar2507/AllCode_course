const mongoose = require('mongoose');
const Course = require('./models/Course');

const mongoURI = 'mongodb://127.0.0.1:27017/allcode';

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('Connected to DB');
        const count = await Course.countDocuments();
        console.log(`Total courses: ${count}`);
        const courses = await Course.find({});
        console.log('Courses:', JSON.stringify(courses, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
