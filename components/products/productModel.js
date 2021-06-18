const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  price: { type: Number, required: true, min: 2 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
