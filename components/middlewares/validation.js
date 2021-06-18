const Joi = require('joi');

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    // confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};
