import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import Driver from '../src/models/driver_tmp';

describe("Driver Registration API Test", () => {
  let server: any;

  before((done) => {
    server = app.listen(done);
  });

  after((done) => {
    server.close(done);
  });

  beforeEach(async () => {
    await Driver.destroy({ where: {} });
  });

  it("should register a new driver", async () => {
    const res = await request(server)
      .post('/drivers/register')
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "1234567890",
        password: "password123"
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message").that.equals("Driver registered successfully.");
  });
});
