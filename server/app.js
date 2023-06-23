const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError');
const cors = require('cors');

const globalHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

//Start Express
const app = express();

app.use(cors());

//Development loggint
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});

app.use('/api/v1/users', limiter);

//Body parser, reading data from body to req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalHandler);

module.exports = app;
