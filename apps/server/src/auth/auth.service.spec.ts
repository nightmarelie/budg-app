import { forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtConfig } from '../config';
import { AppModule } from '../app.module';
import { User, UserModule } from '../user';
import { UtilsModule } from '../utils';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import {
  runSeeder,
  tearDownDatabase,
  useRefreshDatabase,
  useSeeding,
} from 'typeorm-seeding';
import CreateAuthSeed from './auth.seed';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    await useRefreshDatabase();
    await useSeeding();
    await runSeeder(CreateAuthSeed);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user object when credentials are valid', async () => {
    const result = await service.validateUser('admin', 'password');

    console.log(result);

    expect(result.uuid).toEqual('00000000-0000-0000-0000-000000000000');
    expect(result.username).toEqual('admin');
    expect(result.email).toEqual('admin@test.com');
    expect(result.isActive).toEqual(true);
  });

  it('should return null when credentials are invalid', async () => {
    const result = await service.validateUser('xxx', 'xxx');

    expect(result).toBeNull();
  });

  it('should return JWT object when credentials are valid', async () => {
    const result = await service.login(
      new User({
        username: 'maria',
        uuid: '00000000-0000-0000-0000-000000000003',
      }),
    );

    expect(result.accessToken).toBeDefined();
    expect(result.expiresIn).toBeDefined();
  });
});
