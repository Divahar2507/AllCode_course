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
        default: true
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
    // --- Extended Profile Fields ---
    // Personal
    gender: String,
    dob: Date,
    phone: String,
    altPhone: String,

    // Professional
    workExperience: { type: String, default: 'Fresher' },
    careerGap: { type: String, default: '0' },
    currentState: String,
    currentCity: String,
    preferredLocation: String,

    // Social Links
    githubLink: String,
    linkedinLink: String,
    resumeLink: String,

    // Education - 10th
    tenthSchool: String,
    tenthYear: String,
    tenthMarks: String,

    // Education - 12th/Diploma
    twelfthSchool: String, // Or Diploma College
    twelfthYear: String,
    twelfthMarks: String,

    // Education - UG
    collegeName: String,
    collegeRollNo: String,
    collegeDegree: String, // e.g., B.Tech
    collegeBranch: String, // e.g., CSE
    collegeYear: String,
    collegeMarks: String, // Percentage
    collegeCGPA: String,
    activeBacklogs: { type: String, default: 'No Backlogs' },

    // Existing fields mapped
    bio: String,
    skills: String,
    hobbies: String,
    interests: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
