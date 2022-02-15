import supertest from 'supertest';
import app from '../app.js';

let request = supertest(app);
const pingPath = '/api/ping';

describe(`GET ${pingPath}`, () => {
  it('should return a 200 status code', async() => {
    await request.get(pingPath)
      .expect(200);
  });

  it('should specify json in the content header type', async() => {
    await request.get(pingPath)
      .expect("Content-Type", /json/);
  });

  it('should return body with success field equal to true', async() => {
    await request.get(pingPath)
      .expect({success: true});
  });
});
