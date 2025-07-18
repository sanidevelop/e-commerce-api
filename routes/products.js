const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { productName, cost, productImages, description, stockStatus } = req.body;
    const product = await Product.create({
      productName,
      ownerId: req.user.userId,
      cost,
      productImages,
      description,
      stockStatus
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
