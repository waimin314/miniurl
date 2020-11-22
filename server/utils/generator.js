const { customAlphabet } = require('nanoid');

const SLUG_LENGTH = 7;

const generateSlug = () => {
  // By default nanoid includes _ and -
  // Exclue them using customAlphabet to make it easier to read the slug
  const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    SLUG_LENGTH
  );
  return nanoid();
};

module.exports = { generateSlug };
