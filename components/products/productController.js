const mongoose = require('mongoose');
const Product = require('./productModel');
const validate = require('../middlewares/validation');

module.exports.products_get_all = async (req, res) => {
  res.send('products route is working');
};

module.exports.products_post_create = async (req, res) => {};

module.exports.products_get_product = async (req, res) => {};

module.exports.products_patch_product = async (req, res) => {};

module.exports.products_delete_product = async (req, res) => {};
