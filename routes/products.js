const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoosePaginate = require('mongoose-paginate-v2');

Product.schema.plugin(mongoosePaginate);

router.get('/brand/:brandId/:page/:limit', async (req, res) => {
  const { brandId, page, limit } = req.params;
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