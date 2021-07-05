import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    product: { type: 'ObjectId', ref: 'Product' },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
