import { forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { AuthService } from 'auth';
import CreateAuthSeed from 'auth/auth.seed';
import { JwtStrategy, LocalStrategy } from 'auth/strategies';
import { JwtConfig } from 'config';
import {
  runSeeder,
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';
import { UserModule } from 'user';
import { UtilsModule } from 'utils';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    await useRefreshDatabase();
    await useSeeding();
    await runSeeder(CreateAuthSeed);

    const modRef = await Test.createTestingModule({
      imports: [
        AppModule,
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) =>
            configService.get<JwtConfig>('jwt'),
          inject: [ConfigService],
        }),
        UtilsModule,
      ],
      providers: [LocalStrategy, JwtStrategy, AuthService],
    }).compile();

    app = modRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  it('should get a JWT then successfully make a call', async () => {
    const loginRes = await app
      .inject()
      .post('/auth/login')
      .body({ username: 'admin', password: 'password' })
      .end();

    expect(loginRes.statusCode).toBe(201);

    const token = loginRes.json().accessToken;

    const userRes = await app
      .inject()
      .get('/users')
      .headers({
        ['authorization']: 'Bearer ' + token,
      })
      .end();

    expect(userRes.statusCode).toBe(200);
    expect(userRes.body).toContain('admin');
  });

  afterAll(async () => {
    await app.close();
    await tearDownDatabase();
  });
});
