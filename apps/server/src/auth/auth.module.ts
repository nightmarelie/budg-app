import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy, JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from '../utils';
import { JwtConfig } from '../config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get<JwtConfig>('jwt'),
      inject: [ConfigService],
    }),
    UtilsModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
