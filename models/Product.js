const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cost: { type: Number, required: true },
  productImages: [{ type: String }],
  description: { type: String },
  stockStatus: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock'],
    default: 'in-stock'
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }
}, { timestamps: true });


productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);