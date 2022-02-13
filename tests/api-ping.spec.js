const request = require('supertest');
const app = require('../app');

describe('GET /api/ping', () => {
  it('should return a 200 status code', async() => {
    await request(app)
      .get('/api/ping')
      .expect(200);
  });

  it('should return a JSON response', async() => {
    await request(app)
      .get('/api/ping')
      .expect('Content-Type', /json/);
  });

  it('should return response with success value', async() => {
    await request(app)
      .get('/api/ping')
      .expect({success: true});
  });
});
