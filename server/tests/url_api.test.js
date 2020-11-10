const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Url = require('../models/url');
const { initialUrls, urlsInDb } = require('./test_helper');

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

afterAll(() => {
  mongoose.connection.close();
});
