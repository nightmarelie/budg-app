import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  it('/health (GET)', async () => {
    const res = await app.inject().get('/health').end();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(
      JSON.stringify({
        status: 'ok',
        info: { api: { status: 'up' } },
        error: {},
        details: { api: { status: 'up' } },
      }),
    );
  });
});
