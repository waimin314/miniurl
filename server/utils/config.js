require('dotenv').config();

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let HOMEPAGE_URL = process.env.HOMEPAGE_URL;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

if (process.env.NODE_ENV === 'production') {
  HOMEPAGE_URL = process.env.HOMEPAGE_URL_PROD;
}

module.exports = {
  PORT,
  MONGODB_URI,
  HOMEPAGE_URL,
};
