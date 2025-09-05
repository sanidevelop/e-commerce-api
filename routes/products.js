const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoosePaginate = require('mongoose-paginate-v2');
const { authMiddleware, adminOnly } = require('../middleware/auth');

if (!Product.schema.plugins.find(p => p.fn === mongoosePaginate)) {
  Product.schema.plugin(mongoosePaginate);
}

router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { productName, cost, productImages, description, stockStatus, brandId } = req.body;

    if (!brandId) {
      return res.status(400).json({ message: 'brandId is required' });
    }

    const product = await Product.create({
      productName,
      cost,
      productImages,
      description,
      stockStatus,
      brand: brandId,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('brand');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/brands/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await Product.paginate(
      { brand: brandId },
      {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: 'brand',
      }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;