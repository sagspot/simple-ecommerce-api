import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  price: { type: Number, required: true, min: 2 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
