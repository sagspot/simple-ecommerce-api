const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  product: { type: 'ObjectId', ref: 'Product' },
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
