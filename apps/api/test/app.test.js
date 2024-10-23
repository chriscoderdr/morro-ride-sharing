import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';  // Import your Koa app

describe('Koa Application Test', () => {

  // Test for the root route
  it('should return "Hello, world!" on GET /', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Hello, world!');
  });

  // Test for a non-existing route
  it('should return 404 for non-existing route', async () => {
    const response = await request(app.callback()).get('/nonexistent');
    expect(response.status).to.equal(404);
  });

});
