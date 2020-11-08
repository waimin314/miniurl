const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const cors = require('cors');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const urlsRouter = require('./controllers/urls');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to mongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to mongoDB: ', err.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/urls', urlsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
