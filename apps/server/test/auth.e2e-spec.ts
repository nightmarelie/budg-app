import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth';

describe('E2E JWT Sample', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  it('should get a JWT then successfully make a call', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' }) // FIXME: change to use test user
      .expect(201);

    const token = loginReq.body.access_token;
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ userId: 1, username: 'john' }); // FIXME: change to use test user
  });

  afterAll(async () => {
    await app.close();
  });
});
