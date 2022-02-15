import supertest from 'supertest';
import app from '../app';
import * as matchers from 'jest-extended';
import { requestParamsModel } from '../models/posts-request/requestParams.model.js';
import path from 'path';
import fs from 'fs';

expect.extend(matchers);

let request = supertest(app);
const postsPath = '/api/posts';

describe(`/GET ${postsPath}`, () => {
  // Failure Cases
  describe('Invalid parameters', () => {
    //Invalid values
    const testData = [
      // Missing tag parameter
      [{}, [requestParamsModel.tags]],
      [{sortBy: "likes", direction: "asc"}, [requestParamsModel.tags]],
      [{tags: ' ', sortBy: "likes", direction: "asc"}, [requestParamsModel.tags]],
      // Invalid sortBy/direction parameter
      [{tags: 'tech', sortBy: 'invalid'}, [requestParamsModel.sortBy]],
      [{tags: 'tech', direction: 'invalid'}, [requestParamsModel.direction]],
      // Missing tag parameter and invalid sortBy/direction
      [{sortBy: 'invalid', direction: 'asc'}, [requestParamsModel.tags, requestParamsModel.sortBy]],
      [{sortBy: "likes", direction: 'invalid'}, [requestParamsModel.tags, requestParamsModel.direction]],
      [{tags: ' ', sortBy: 'invalid', direction: 'asc'}, [requestParamsModel.tags, requestParamsModel.sortBy]],
      [{tags: ' ', sortBy: "likes", direction: 'invalid'}, [requestParamsModel.tags, requestParamsModel.direction]]
    ];

    test.each(testData)('%#. Response status 400', async (params) => {
      await request
        .get(postsPath)
        .query(params)
        .expect(400);
    });

    test.each(testData)('%#. Response type JSON', async (params) => {
      await request
        .get(postsPath)
        .query(params)
        .expect("Content-Type", /json/);
    });

    test.each(testData)('%#. Error Body with correct messages', async (params , expectedBody) => {
      const res = await request
        .get(postsPath)
        .query(params);

      expect(res.body).toContainKeys(['error']);

      if (expectedBody.includes(requestParamsModel.tags)) {
        expect(res.body.error).toContainKeys([requestParamsModel.tags]);
        expect(res.body.error.tags).toBeString();
      }
      if (expectedBody.includes(requestParamsModel.sortBy)) {
        expect(res.body.error).toContainKeys([requestParamsModel.sortBy]);
        expect(res.body.error.sortBy).toBeString();
      }
      if (expectedBody.includes(requestParamsModel.direction)) {
        expect(res.body.error).toContainKeys([requestParamsModel.direction]);
        expect(res.body.error.direction).toBeString();
      }
    });
  });

  // Success Cases
  describe('Valid parameters', () => {
    const validTestData = [
      //Non-Cached
      [{tags: 'tech'}],
      [{tags: 'history'}],
      //Cached
      [{tags: 'tech,history'}],
      [{tags: 'tech,history', sortBy: 'reads'}],
      [{tags: 'tech,history', direction: 'desc'}],
      [{tags: 'tech,history', sortBy: 'reads', direction: 'desc'}],
    ];

    beforeAll(() => {
      const cachePath = path.resolve('__tests__/cache');
      fs.readdirSync(cachePath).forEach(f => fs.rmSync(`${cachePath}/${f}`));
    });

    // Status code 200
    test.each(validTestData)('%#. Response status 200', async (params) => {
      await request
        .get(postsPath)
        .query(params)
        .expect(200);
    });

    // JSON response body
    test.each(validTestData)('%#. Response type JSON', async (params) => {
      await request
        .get(postsPath)
        .query(params)
        .expect("Content-Type", /json/);
    });

    // Contains posts of type array with following keys and of valid types
    test.each(validTestData)('%#. Response body contains posts with valid keys', async(params) => {
      const res = await request
        .get(postsPath)
        .query(params);

      expect(res.body).toContainKey('posts');
      expect(res.body.posts).toBeArray();
    });
  });
});
