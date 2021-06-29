import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import userRoute from './components/users/users.js';
import productRoute from './components/products/products.js';
import orderRoute from './components/orders/orders.js';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce solution',
      version: '1.0.0',
      description: 'Simple E-Commerce API for an ecommerce website',
    },
    servers: [
      {
        description: 'Dev server',
        url: 'http://localhost:5000',
      },
      {
        description: 'Prod server',
        url: 'https://sagspot-shop.herokuapp.com',
      },
    ],
  },
  apis: ['./components/*/*.js'],
};

const specs = swaggerJSDoc(options);

mongoose.connect(
  process.env.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to Mongo DataBase!')
);

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
