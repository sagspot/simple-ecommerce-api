import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3 },
    price: { type: Number, required: true, min: 2 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
