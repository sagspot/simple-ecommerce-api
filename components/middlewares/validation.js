import Joi from 'joi';

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    // confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required(),
  });

  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

export const createProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(data);
};

export const updateProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
  });

  return schema.validate(data);
};

export const createOrderValidation = (data) => {
  const schema = Joi.object({
    product: Joi.required(),
    quantity: Joi.number(),
  });

  return schema.validate(data);
};

export const updateOrderValidation = (data) => {
  const schema = Joi.object({
    quantity: Joi.number().required(),
  });

  return schema.validate(data);
};
