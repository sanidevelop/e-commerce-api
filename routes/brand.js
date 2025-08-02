const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// POST - Add a brand (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const brand = await Brand.create({ brandName: req.body.brandName });
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - List all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update brand by ID (admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, { brandName: req.body.brandName }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete brand by ID (admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;