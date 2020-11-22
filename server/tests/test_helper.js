const Url = require('../models/url');
const { HOMEPAGE_URL } = require('../utils/config');
const { generateSlug } = require('../utils/generator');

const slugs = [generateSlug(), generateSlug(), generateSlug()];

const initialUrls = [
  {
    miniUrl: HOMEPAGE_URL + slugs[0],
    fullUrl: 'https://waimin314.github.io/is_this_your_card/',
    slug: slugs[0],
  },
  {
    miniUrl: HOMEPAGE_URL + slugs[1],
    fullUrl: 'https://score-your-scrabble.vercel.app/',
    slug: slugs[1],
  },
  {
    miniUrl: HOMEPAGE_URL + slugs[2],
    fullUrl: 'https://book-a-slot.vercel.app/',
    slug: slugs[2],
  },
];

const urlsInDb = async () => {
  const urls = await Url.find({});
  return urls.map((url) => url.toJSON());
};

module.exports = { initialUrls, urlsInDb };
