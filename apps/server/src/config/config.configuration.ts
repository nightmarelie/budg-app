import { join } from 'path';

export const isTestEnv = () => process.env.NODE_ENV === 'test';
const distDir = isTestEnv() ? ['src'] : [__dirname, '..'];

export enum EnvFile {
  LOCAL = '.env.local',
  DEVELOPMENT = '.env.development',
  TEST = '.env.test',
  PRODUCTION = '.env',
}

export enum ConfigRoot {
  DATABASE = 'database',
  CACHE = 'cache',
  PORT = 'port',
  SECURITY_THROTTLE = 'security.throttle',
  JWT = 'jwt',
  QUEUE = 'queue',
}

export const configuration = () => ({
  port: parseInt(process.env.PORT as string),
  environment: process.env.NODE_ENV,
  [ConfigRoot.DATABASE]: {
    ...(isTestEnv()
      ? {
          database: process.env.DATABASE_NAME,
        }
      : {
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT as string),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        }),
    name: process.env.DATABASE_CONNECTION_NAME,
    logging: process.env.DATABASE_LOGGING === 'true',
    dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    type: process.env.DATABASE_TYPE,
    seeds: [join(...distDir, '**', '*.seed.{ts,js}')],
    factories: [join(...distDir, '**', '*.factory.{ts,js}')],
    migrations: [join(...distDir, '**', '*.migration.{ts,js}')],
    entities: [join(...distDir, '**', '*.entity.{ts,js}')],
  },
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET,
    signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN },
  },
  security: {
    throttle: {
      ttl: parseInt(process.env.THROTTLE_TTL as string),
      limit: parseInt(process.env.THROTTLE_LIMIT as string),
    },
  },
  [ConfigRoot.CACHE]: {
    ttl: parseInt(process.env.CACHE_TTL as string),
    max: parseInt(process.env.CACHE_MAX as string),
  },
  [ConfigRoot.QUEUE]: {
    redis: {
      host: process.env.QUEUE_HOST,
      port: parseInt(process.env.QUEUE_PORT as string),
    },
  },
});

export type Configuration = ReturnType<typeof configuration>;
export type DatabaseConfig = Configuration[ConfigRoot.DATABASE];
export type JwtConfig = Configuration['jwt'];
export type ThrottleConfig = Configuration['security']['throttle'];
export type CacheConfig = Configuration[ConfigRoot.CACHE];
export type QueueConfig = Configuration[ConfigRoot.QUEUE];
