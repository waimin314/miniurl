const urlsRouter = require('express').Router();
const validUrl = require('valid-url');
const Url = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');
const { generateSlug } = require('../utils/generator');

urlsRouter.get('/:slug', async (request, response) => {
  const slug = request.params.slug;
  const urlFromDB = await Url.findOne({ slug });

  if (!urlFromDB) return response.status(404).send();

  response.json(urlFromDB);
});

urlsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!validUrl.isWebUri(body.fullUrl)) {
    return response.status(400).send({ error: 'invalid link' });
  }

  const slug = generateSlug();

  const newUrl = new Url({
    miniUrl: HOMEPAGE_URL + slug,
    fullUrl: body.fullUrl,
    slug,
  });
  const savedUrl = await newUrl.save();
  response.status(201).json(savedUrl);
});

module.exports = urlsRouter;
