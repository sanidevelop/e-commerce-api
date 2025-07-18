const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cost: { type: Number, required: true },
  productImages: [{ type: String }],
  description: { type: String },
  stockStatus: { type: String, enum: ['in-stock', 'low-stock', 'out-of-stock'], default: 'in-stock' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
