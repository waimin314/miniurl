const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Url = require('../models/url');
const { initialUrls, urlsInDb } = require('./test_helper');
const { nanoid } = require('nanoid');

const api = supertest(app);

beforeEach(async () => {
  await Url.deleteMany({});

  const urlObjects = initialUrls.map((url) => new Url(url));
  const promiseArray = urlObjects.map((url) => url.save());
  await Promise.all(promiseArray);
});

describe('When saving a minified url', () => {
  test('Should save the shorten url to DB if valid data', async () => {
    const newUrl = {
      fullUrl: 'https://github.com/waimin314',
    };

    await api
      .post('/api/v1/urls')
      .send(newUrl)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const urlsAfterPost = await urlsInDb();
    expect(urlsAfterPost).toHaveLength(initialUrls.length + 1);

    const lastUrl = urlsAfterPost[initialUrls.length];
    expect(lastUrl.fullUrl).toEqual(newUrl.fullUrl);
  });

  test('Should NOT save the invalid link', async () => {
    const newUrl = {
      fullUrl: 'ht tp invalid link',
    };

    await api.post('/api/v1/urls').send(newUrl).expect(400);
    const urlsAfterPost = await urlsInDb();
    expect(urlsAfterPost).toHaveLength(initialUrls.length);
  });

  test('Should NOT save the missing link', async () => {
    await api.post('/api/v1/urls').send({}).expect(400);
    const urlsAfterPost = await urlsInDb();
    expect(urlsAfterPost).toHaveLength(initialUrls.length);
  });
});

describe('When retrieving a Url', () => {
  test('Should redirect to the full Url if exists', async () => {
    const currentUrls = await urlsInDb();
    const { fullUrl, slug } = currentUrls[0];

    await api
      .get(`/api/v1/urls/${slug}`)
      .expect('Location', fullUrl)
      .expect(`Found. Redirecting to ${fullUrl}`);
  });

  test('Should return 404 if the path is not found', async () => {
    const invalidSlug = nanoid(8);

    await api.get(`/api/v1/urls/${invalidSlug}`).expect(404);
  });

  test('Should not do anything if no slug specified', async () => {
    await api.get('/api/v1/urls/').expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
