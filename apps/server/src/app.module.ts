import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
import { PlaygroundModule } from './playground';
import { RoleModule } from './role';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
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
