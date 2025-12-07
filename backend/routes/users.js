const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyAdmin = require('../middleware/auth');

// GET all users (Admin only)
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate('enrolledCourses.courseId', 'title')
            .populate('batch', 'name'); // Populate batch info
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('enrolledCourses.courseId')
            .populate('batch');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Update User Profile (Self or Admin) - Handles Name, Avatar, Bio, etc.
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update standard fields
        if (req.body.name) user.name = req.body.name;
        if (req.body.profilePicture !== undefined) user.profilePicture = req.body.profilePicture;

        // Update extended profile fields
        const profileFields = ['bio', 'skills', 'hobbies', 'interests', 'collegeName', 'collegeDegree', 'collegeYear',
            'schoolName', 'schoolBoard', 'schoolYear', 'interviewAlignment'];

        profileFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        const updatedUser = await user.save();

        // Return updated user sans password
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST - Public Signup (Needs Approval)
router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // In production, hash this password
        role: 'student', // Default public signup is always student
        isApproved: false // Explicitly false
    });

    try {
        const newUser = await user.save();
        res.status(201).json({
            message: 'Registration successful! Please wait for admin approval to login.',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isApproved: newUser.isApproved
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST - Register new user (ADMIN ONLY - Auto Approved)
router.post('/register', verifyAdmin, async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'student',
        isApproved: true, // Admin created users are auto-approved
        batch: req.body.batchId // Optional: assign batch on creation
    });

    try {
        const newUser = await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isApproved: newUser.isApproved,
                batch: newUser.batch
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST - Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // In production, use bcrypt to compare hashed passwords
        if (user.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user is approved
        if (!user.isApproved) {
            return res.status(403).json({
                message: 'Account pending approval. Please contact the administrator.'
            });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Approve User (Admin only)
router.put('/:id/approve', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isApproved = true;
        await user.save();

        res.json({ message: 'User approved successfully', user: { id: user._id, name: user.name, isApproved: user.isApproved } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Update user role (Admin only)
router.put('/:id/role', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = req.body.role;
        await user.save();

        res.json({ message: 'User role updated', user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT - Assign Batch to User (Admin only)
router.put('/:id/batch', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.batch = req.body.batchId;
        await user.save();

        res.json({ message: 'Batch assigned successfully', user: { id: user._id, name: user.name, batch: user.batch } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST - Enroll user in course
router.post('/:id/enroll', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const alreadyEnrolled = user.enrolledCourses.some(
            course => course.courseId.toString() === req.body.courseId
        );

        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        user.enrolledCourses.push({
            courseId: req.body.courseId,
            enrolledDate: new Date(),
            progress: 0
        });

        await user.save();
        res.json({ message: 'Enrolled successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE user (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
