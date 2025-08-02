const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const Product = require('../models/Product');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const mongoosePaginate = require('mongoose-paginate-v2');

Product.schema.plugin(mongoosePaginate);

// Admin: Create a brand
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Update a brand
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Brand not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin: Delete a brand
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Brand not found' });
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get paginated products by brand
router.get('/:brandId/products/:page/:limit', async (req, res) => {
  const { brandId, page, limit } = req.params;
  try {
    const result = await Product.paginate(
      { brand: brandId },
      {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: 'brand'
      }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;