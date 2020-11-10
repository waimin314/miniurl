const urlsRouter = require('express').Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const url = require('../models/url');
const URL = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');

const MAX_SLUG_LENGTH = 7;

urlsRouter.get('/:slug', async (request, response) => {
  const slug = request.params.slug;
  const urlFromDB = await URL.findOne({ slug: slug });

  if (!urlFromDB) return response.status(404).send();

  response.redirect(urlFromDB.fullUrl);
});

urlsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!validUrl.isWebUri(body.fullUrl)) {
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
