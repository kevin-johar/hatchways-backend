import supertest from 'supertest';
import app from '../app.js';

describe('GET /api/ping', () => {
  it('should return a 200 status code', async() => {
    // Should return a status code of 200

    await supertest(app).get('/api/ping', (res) => {
      console.log(res);
    }).expect(200);
  });

  it('should specify json in the content header type', () => {

  });
});
