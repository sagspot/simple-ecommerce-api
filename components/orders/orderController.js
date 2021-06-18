const mongoose = require('mongoose');
const Order = require('./orderModel');
const validate = require('../middlewares/validation');

module.exports.orders_get_all = async (req, res) => {
  res.send('orders route is working');
};

module.exports.orders_post_create = async (req, res) => {};

module.exports.orders_get_product = async (req, res) => {};

module.exports.orders_delete_product = async (req, res) => {};
