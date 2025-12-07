const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const verifyAdmin = require('../middleware/auth');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new course (Admin)
router.post('/', verifyAdmin, async (req, res) => {
    const course = new Course({
        title: req.body.title,
        mentor: req.body.mentor,
        description: req.body.description,
        time: req.body.time,
        type: req.body.type,
        accentColor: req.body.accentColor,
        startDate: req.body.startDate,
        modules: req.body.modules || []
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE course (Admin)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Module Management Routes ---

// Add Module
router.post('/:id/modules', verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const newModule = {
            title: req.body.title,
            topics: []
        };

        course.modules.push(newModule);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Module
router.delete('/:id/modules/:moduleId', verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        course.modules.pull(req.params.moduleId);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Topic Management Routes ---

// Add Topic to Module
router.post('/:id/modules/:moduleId/topics', verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const module = course.modules.id(req.params.moduleId);
        if (!module) return res.status(404).json({ message: 'Module not found' });

        const newTopic = {
            title: req.body.title,
            type: req.body.type || 'video',
            content: req.body.content || '',
            videoUrl: req.body.videoUrl || ''
        };

        module.topics.push(newTopic);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Topic from Module
router.delete('/:id/modules/:moduleId/topics/:topicId', verifyAdmin, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const module = course.modules.id(req.params.moduleId);
        if (!module) return res.status(404).json({ message: 'Module not found' });

        module.topics.pull(req.params.topicId);
        await course.save();
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// PUT - Mark topic as completed and update progress (Student/Public)
// Note: Keeping this public/unprotected for now as purely student-facing, 
// but normally should check user enrollment.
router.put('/:courseId/module/:moduleId/topic/:topicId/complete', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const module = course.modules.id(req.params.moduleId);
        if (!module) return res.status(404).json({ message: 'Module not found' });

        const topic = module.topics.id(req.params.topicId);
        if (!topic) return res.status(404).json({ message: 'Topic not found' });

        // Toggle completion
        topic.completed = !topic.completed;

        // Calculate overall progress
        let totalTopics = 0;
        let completedTopics = 0;

        course.modules.forEach(mod => {
            mod.topics.forEach(top => {
                totalTopics++;
                if (top.completed) completedTopics++;
            });
        });

        course.progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

        // Update status based on progress
        if (course.progress === 0) {
            course.status = 'Not Started';
        } else if (course.progress === 100) {
            course.status = 'Completed';
        } else {
            course.status = 'In Progress';
        }

        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
