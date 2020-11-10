const urlsRouter = require('express').Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');

const MAX_SLUG_LENGTH = 7;

urlsRouter.get('/:slug', async (request, response) => {
  const slug = request.params.slug;
  const urlFromDB = await Url.findOne({ slug: slug });

  if (!urlFromDB) return response.status(404).send();

  response.redirect(urlFromDB.fullUrl);
});

urlsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!validUrl.isWebUri(body.fullUrl)) {
    return response.status(400).send({ error: 'invalid link' });
  }

  const slug = nanoid(MAX_SLUG_LENGTH);
  const newUrl = new Url({
    miniUrl: HOMEPAGE_URL + slug,
    fullUrl: body.fullUrl,
    slug,
  });
  const savedUrl = await newUrl.save();
  response.status(201).json(savedUrl);
});

module.exports = urlsRouter;
