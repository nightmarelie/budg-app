import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../utils';
import { User, UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) =>
            configService.get<JwtConfig>('jwt'),
          inject: [ConfigService],
        }),
        AppModule,
        UtilsModule,
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // FIXME: Mock the repository
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
