import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import {
  configuration,
  validationOptions,
  validationSchema,
  isTestEnv,
  ConfigController,
  DatabaseConfig,
  ThrottleConfig,
} from './config';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { ThrottlerModule } from '@nestjs/throttler';
import { UtilsModule } from './utils';
import { LoggerModule } from './logger';
import { PlaygroundModule } from './playground/playground.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    ConfigModule.forRoot({
      envFilePath: [
        isTestEnv() ? '.env.test' : '.env.local',
        '.env.development',
        '.env',
      ],
      isGlobal: true,
      load: [configuration],
      validationOptions,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          ...configService.get<DatabaseConfig>('database'),
        } as TypeOrmModuleOptions),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<ThrottleConfig>('security.throttle'),
    }),
    UserModule,
    AuthModule, // TODO: maybe it will be better to enable it globally https://docs.nestjs.com/security/authentication#enable-authentication-globally
    HealthModule,
    UtilsModule,
    LoggerModule,
    PlaygroundModule,
  ],
  controllers: [AppController, ConfigController],
  providers: [AppService],
})
export class AppModule {}
