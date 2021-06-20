const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const validate = require('../middlewares/validation');

module.exports.users_get_all = (req, res) => {
  User.find()
    .then((docs) => res.status(200).send(docs))
    .catch((err) => res.status(500).send(err));
};

module.exports.users_post_register = async (req, res) => {
  const { error } = validate.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send('Email already exist');

  const hash = await bcrypt.hashSync(req.body.password, 10);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      user: savedUser._id,
      username: savedUser.name,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.users_post_login = async (req, res) => {
  const { error } = validate.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(409).send('Authentication failed');

  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!validPassword) return res.status(400).send('Authentication failed');

  try {
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'Authentication successful', token });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports.users_delete = async (req, res) => {
  const user = await User.findOne({ _id: req.userData.id });
  try {
    const removeUser = await user.remove();
    res.status(204).send('User deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
