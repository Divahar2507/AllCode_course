const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    enrolledCourses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        enrolledDate: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0
        }
    }],
    // Profile Fields
    bio: String,
    skills: String,
    collegeName: String,
    collegeDegree: String,
    collegeYear: String,
    schoolName: String,
    schoolBoard: String,
    schoolYear: String,
    interviewAlignment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
