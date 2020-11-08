const urlsRouter = require('express').Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const URL = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');

const MAX_SLUG_LENGTH = 7;

urlsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!validUrl.isWebUri(body.fullurl)) {
    return response.status(400).send({ error: 'invalid link' });
  }

  const slug = nanoid(MAX_SLUG_LENGTH);
  const url = new URL({
    miniUrl: HOMEPAGE_URL + slug,
    fullUrl: body.fullUrl,
    slug,
  });
  const savedUrl = await url.save();
  response.status(201).json(savedUrl);
});

module.exports = urlsRouter;
