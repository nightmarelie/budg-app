import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  configuration,
  validationOptions,
  validationSchema,
  ConfigController,
} from './config';
import { UserModule, User } from './user';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env'],
      isGlobal: true,
      load: [configuration],
      validationOptions,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [User],
          synchronize: configService.get<boolean>('database.synchronize'),
        } as TypeOrmModuleOptions),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('security.throttleTtl'),
        limit: configService.get<number>('security.throttleLimit'),
      }),
    }),
    UserModule,
    AuthModule, // TODO: maybe it will be better to enable it globally https://docs.nestjs.com/security/authentication#enable-authentication-globally
    HealthModule,
  ],
  controllers: [AppController, ConfigController],
  providers: [AppService],
})
export class AppModule {}
