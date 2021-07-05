import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './userModel.js';
import {
  registerValidation,
  loginValidation,
} from '../middlewares/validation.js';

export const users_get_all = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const users_post_register = async (req, res) => {
  const { error } = registerValidation(req.body);
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

    const loggedUser = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ user: loggedUser, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const users_post_login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(409).send('Authentication failed');

  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!validPassword) return res.status(409).send('Authentication failed');

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

export const users_delete = async (req, res) => {
  const user = await User.findOne({ _id: req.userData.id });
  try {
    const removeUser = await user.remove();
    res.status(204).send('User deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
