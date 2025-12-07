const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new message
router.post('/', async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const post = new Post({
            userId,
            authorName: user.name,
            title,
            content
        });

        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT - Add a comment
router.post('/:id/comment', async (req, res) => {
    try {
        const { userId, text } = req.body;
        const post = await Post.findById(req.params.id);
        const user = await User.findById(userId);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments.push({
            userId,
            username: user.name,
            text
        });

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT - Like a post
router.put('/:id/like', async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
