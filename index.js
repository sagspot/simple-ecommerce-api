const express = require('express');
const dotenve = require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoute = require('./components/users/users');
const productRoute = require('./components/products/products');
const orderRoute = require('./components/orders/orders');

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
