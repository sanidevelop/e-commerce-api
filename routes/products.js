const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoosePaginate = require('mongoose-paginate-v2');



router.get('/brands/:brandId/products', async (req, res) => {
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

module.exports = router;