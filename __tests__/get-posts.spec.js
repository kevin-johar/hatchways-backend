import supertest from 'supertest';
import app from '../app';
import * as matchers from 'jest-extended';

expect.extend(matchers);

let request = supertest(app);
const postsPath = '/api/posts';

describe(`/GET ${postsPath}`, () => {
  // Failure Cases
  describe('No tags parameter provided', () => {
    it('Should return status code 400', async () => {
      await request.get(postsPath)
        .expect(400);
    });

    it('Should have a response type JSON', async () => {
      await request.get(postsPath)
        .expect("Content-Type", /json/);
    });

    it('Should provide a response body with field error.tags of type string', async () => {
      const res = await request.get(postsPath);
      console.log(res.body);
      expect(res.body).toContainAnyKeys(['error', 'tags']);
      expect(res.body.error.tags).toBeString();
    });
  });

  describe('Tags query parameter provided', () => {
    describe('but invalid sortBy parameter value', () => {
      it('Should return status code 400', () => {

      });

      it('Should have a response type JSON', () => {

      });

      it('Should provide a response body with field error.sortBy of type string', () => {

      });
    });

    describe('but invalid direction parameter value', () => {
      it('Should return status code 400', () => {

      });

      it('Should have a response type JSON', () => {

      });

      it('Should provide a response body with field error.direction of type string', () => {

      });
    });
  });

  // Success Cases
});
