const mongoose = require('mongoose');
const Product = require('./productModel');
const validate = require('../middlewares/validation');

module.exports.products_get_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.products_post_create = async (req, res) => {
  const { error } = validate.createProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ savedProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.products_get_product = async (req, res) => {
  const id = req.params.productId;
  try {
    const validateObjectId = await mongoose.isValidObjectId(id);
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.products_patch_product = async (req, res) => {
  const { error } = validate.updateProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.productId;

  try {
    const validateObjectId = await mongoose.isValidObjectId(id);
    const product = await Product.findById(id);
    const updateProduct = await Product.update(
      { _id: id },
      {
        $set: {
          name: req.body.name ? req.body.name : product.name,
          price: req.body.price ? req.body.price : product.price,
        },
      }
    );
    res.status(200).json({ message: 'Product update', updateProduct });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.products_delete_product = async (req, res) => {
  const id = req.params.productId;
  try {
    const validateObjectId = await mongoose.isValidObjectId(id);
    const removeProduct = await Product.findById(id).remove();
    res.status(204).send('Product deleted');
  } catch (err) {
    res.status(404).send(err);
  }
};
