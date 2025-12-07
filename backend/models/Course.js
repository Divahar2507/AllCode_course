const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['video', 'doc'], default: 'video' },
    content: String, // Markdown or HTML content
    note: String, // specific notes for the topic
    videoUrl: String, // URL for video
    completed: { type: Boolean, default: false },
    // New Content Fields
    intro: String,
    story: String,
    importantQuestions: [{ question: String, answer: String }],
    summary: String,
    // Practice Problem
    problem: {
        title: String,
        description: String,
        starterCode: String,
        solution: String,
        testCase: { input: String, output: String }
    }
});

const moduleSchema = new mongoose.Schema({
    title: String,
    topics: [topicSchema]
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mentor: String,
    description: String,
    progress: { type: Number, default: 0 },
    time: String, // e.g., "07:00 PM - 09:00 PM"
    status: { type: String, default: 'Not Started' }, // 'Not Started', 'In Progress', 'Completed'
    type: { type: String, default: 'live' }, // 'live' or 'self-paced'
    accentColor: String, // Hex color code
    startDate: String,
    modules: [moduleSchema]
});

module.exports = mongoose.model('Course', courseSchema);
