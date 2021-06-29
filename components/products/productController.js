import mongoose from 'mongoose';
import Product from './productModel.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../middlewares/validation.js';

export const products_get_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const products_post_create = async (req, res) => {
  const { error } = createProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ product: savedProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const products_get_product = async (req, res) => {
  const id = req.params.productId;
  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) return res.status(404).send('Invalid ID');

  const product = await Product.findById(id);
  if (!product) return res.status(404).send('Product not found');

  try {
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const products_patch_product = async (req, res) => {
  const { error } = updateProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.productId;

  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) return res.status(404).send('Invalid ID');

  const product = await Product.findById(id);
  if (!product) return res.status(404).send('Product not found');

  try {
    const updateProduct = await Product.update(
      { _id: id },
      {
        $set: {
          name: req.body.name ? req.body.name : product.name,
          price: req.body.price ? req.body.price : product.price,
        },
      }
    );
    res.status(200).json({ message: 'Product updated', updateProduct });
  } catch (err) {
    res.status(404).send(err);
  }
};

export const products_delete_product = async (req, res) => {
  const id = req.params.productId;
  const validateObjectId = await mongoose.isValidObjectId(id);
  if (!validateObjectId) return res.status(404).send('Invalid ID');

  const product = await Product.findById(id);
  if (!product) return res.status(404).send('Product not found');

  try {
    await Product.findById(id).remove();
    res.status(204).send('Product deleted');
  } catch (err) {
    res.status(404).send(err);
  }
};
