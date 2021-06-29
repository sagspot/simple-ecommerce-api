import mongoose from 'mongoose';

import Order from './orderModel.js';
import Product from '../products/productModel.js';
import {
  createOrderValidation,
  updateOrderValidation,
} from '../middlewares/validation.js';

export const orders_get_all = async (req, res) => {
  try {
    const orders = await Order.find().populate('product', 'name price');
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const orders_post_create = async (req, res) => {
  const { error } = createOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const validateObjectId = await mongoose.isValidObjectId(req.body.product);
  if (!validateObjectId) res.status(404).send('Invalid product ID');

  const productExist = await Product.findById(req.body.product);
  if (!productExist) return res.status(404).send('Product not found');

  const newOrder = new Order({
    product: req.body.product,
    quantity: req.body.quantity,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const orders_get_order = async (req, res) => {
  const id = req.params.orderId;
  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) res.status(400).send('Invalid ID');

  const order = await Order.findById(id).populate('product');
  if (!order) return res.status(404).send('Order not found');

  try {
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const orders_patch_order = async (req, res) => {
  const { error } = updateOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.orderId;
  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) return res.status(400).send('Invalid ID');

  const orderExist = await Order.findById(id);
  if (!orderExist) return res.status(404).send('Order not found');

  try {
    const updateOrder = await Order.update(
      { _id: id },
      {
        $set: {
          quantity: req.body.quantity,
        },
      }
    );
    res.status(200).json({ message: 'Order updated', updateOrder });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const orders_delete = async (req, res) => {
  const id = req.params.orderId;
  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) return res.status(400).send('Invalid ID');

  const orderExist = await Order.findById(id);
  if (!orderExist) return res.status(404).send('Order not found');

  try {
    await Order.findById(id).remove();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};
