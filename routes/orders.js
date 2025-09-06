const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware, adminOnly } = require('../middleware/auth');


router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: 'Admins cannot create orders' });
    }

    const ordersData = req.body;

    if (!Array.isArray(ordersData) || ordersData.length === 0) {
      return res.status(400).json({ message: 'Orders must be a non-empty array' });
    }

    const createdOrders = await Order.insertMany(
      ordersData.map(order => ({
        ...order,
        ownerId: req.user._id,
      }))
    );

    res.status(201).json(createdOrders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate('productId').populate('ownerId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('productId')
      .populate('ownerId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { shippingStatus } = req.body;

    if (!['pending', 'shipped', 'delivered'].includes(shippingStatus)) {
      return res.status(400).json({ message: 'Invalid shipping status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { shippingStatus },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
