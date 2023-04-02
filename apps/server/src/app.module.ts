import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

import {
  configuration,
  validationOptions,
  validationSchema,
  isTestEnv,
  ConfigController,
  DatabaseConfig,
  ThrottleConfig,
  CacheConfig,
  EnvFile,
  ConfigRoot,
  QueueConfig,
} from './config';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { UtilsModule } from './utils';
import { LoggerModule } from './logger';
import { PlaygroundModule } from './playground';
import { RoleModule } from './role';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) =>
        configService.get<CacheConfig>(ConfigRoot.CACHE),
    }),
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
        isTestEnv() ? EnvFile.TEST : EnvFile.LOCAL,
        EnvFile.DEVELOPMENT,
        EnvFile.PRODUCTION,
      ],
      isGlobal: true,
      load: [configuration],
      validationOptions,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<DatabaseConfig>(
          ConfigRoot.DATABASE,
        ) as TypeOrmModuleOptions,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<ThrottleConfig>(ConfigRoot.SECURITY_THROTTLE),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<QueueConfig>(ConfigRoot.QUEUE),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule, // TODO: maybe it will be better to enable it globally https://docs.nestjs.com/security/authentication#enable-authentication-globally
    HealthModule,
    UtilsModule,
    LoggerModule,
    PlaygroundModule,
    RoleModule,
  ],
  controllers: [ConfigController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
