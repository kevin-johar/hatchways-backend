import fs from 'fs';
import path from 'path';
import { CacheService } from '../services/cache.service.js';

describe('[Cache Service]', () => {
  beforeAll(() => {
    fs.readdirSync(path.resolve('__tests__/cache')).forEach(f => fs.rmSync(path.resolve(`__tests__/cache/${f}`)));
  });

  describe('cachePosts', () => {
    const cachePostsTestData = [
      [
        'health',
        [
          {
            "author": "Rylee Paul",
            "authorId": 9,
            "id": 1,
            "likes": 960,
            "popularity": 0.13,
            "reads": 50361,
            "tags": [
              "tech",
              "health"
            ]
          }
        ],
        'health.json'
      ]
    ];

    test.each(cachePostsTestData)('%#. [Cached Tag] %s', (tag, posts, expected) => {
      CacheService.cachePosts(posts, tag);
      const res = fs.readdirSync(path.resolve('__tests__/cache')).find(f => f === `${tag}.json`);
      expect(res).toStrictEqual(expected);
    });
  });

  describe('getCachedPosts', () => {
    const examplePosts = [
      {
        "author": "Rylee Paul",
        "authorId": 9,
        "id": 1,
        "likes": 960,
        "popularity": 0.13,
        "reads": 50361,
        "tags": [
          "tech",
          "health"
        ]
      },
      {
        "author": "Trevon Rodriguez",
        "authorId": 5,
        "id": 3,
        "likes": 425,
        "popularity": 0.68,
        "reads": 11381,
        "tags": [
          "startups",
          "health"
        ]
      }
    ];

    const getCachedPostsTestData = [
      // tag(string), deleteFile(boolean), expected
      //First example creates file, second deletes it.
      // [IMPORTANT] musts be in this order
      ['health', false, examplePosts],
      ['health', true, undefined]
    ];

    test.each(getCachedPostsTestData)('%#. [Tag] %s', (tag, toDelete, expected) => {
      if (toDelete) {
        fs.rmSync(path.resolve(`__tests__/cache/${tag}.json`))
      } else {
        fs.writeFileSync(path.resolve(`__tests__/cache/${tag}.json`), JSON.stringify(examplePosts));
      }

      const res = CacheService.getCachedPosts(tag);
      console.log(res, expected);
      expect(res).toStrictEqual(expected);
    })
  });

  describe('matchCacheFiles', () => {
    const matchCacheFilesTestData = [
      [
        "tech",
        [
          "business.json",
          "history.json",
          "arts.json",
          "teach.json",
          "teck.json",
          "reach.json",
          "tech.json"
        ],
        "tech.json"
      ],
      [
        "health",
        [
          "business.json",
          "history.json",
          "arts.json",
          "teach.json",
          "teck.json",
          "reach.json",
          "tech.json"
        ],
        undefined
      ]
    ];

    test.each(matchCacheFilesTestData)('%#. [Tag] %s', (tag, files, result) => {
      for (let file of files) {
        fs.writeFileSync(path.resolve(`__tests__/cache/${file}`), 'empty');
      }

      const res = CacheService.matchCacheFiles(tag);
      expect(res).toStrictEqual(result);
    })
  });
});
