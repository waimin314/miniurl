const urlsRouter = require('express').Router();
const { nanoid } = require('nanoid');
const URL = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');

const MAX_SLUG_LENGTH = 7;

urlsRouter.post('/', async (request, response) => {
  const body = request.body;
  const slug = nanoid(MAX_SLUG_LENGTH);
  const url = new URL({
    miniurl: HOMEPAGE_URL + slug,
    fullurl: body.fullurl,
    slug,
  });
  const savedUrl = await url.save();
  response.status(201).json(savedUrl);
});

module.exports = urlsRouter;
