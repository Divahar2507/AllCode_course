const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const verifyAdmin = require('../middleware/auth');

// GET all batches
router.get('/', async (req, res) => {
    try {
        const batches = await Batch.find().sort({ startDate: -1 });
        res.json(batches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Create a new batch (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    const batch = new Batch({
        name: req.body.name,
        startDate: req.body.startDate
    });

    try {
        const newBatch = await batch.save();
        res.status(201).json(newBatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Delete a batch (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);
        if (!batch) return res.status(404).json({ message: 'Batch not found' });
        res.json({ message: 'Batch deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
