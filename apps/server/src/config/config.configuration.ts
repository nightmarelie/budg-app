import { join } from 'path';

export const isTestEnv = () => process.env.NODE_ENV === 'test';
const distDir = isTestEnv() ? 'src' : __dirname;

export const configuration = () => ({
  port: parseInt(process.env.PORT as string),
  environment: process.env.NODE_ENV,
  database: {
    ...(isTestEnv()
      ? {
          location: process.env.DATABASE_LOCATION,
          autoSave: process.env.DATABASE_AUTO_SAVE === 'true',
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
    seeds: [join(distDir, '**', '*.seed.{ts,js}')],
    factories: [join(distDir, '**', '*.factory.{ts,js}')],
    migrations: [join(distDir, '**', '*.migration.{ts,js}')],
    entities: [join(distDir, '**', '*.entity.{ts,js}')],
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
});

export type Configuration = ReturnType<typeof configuration>;
export type DatabaseConfig = Configuration['database'];
export type JwtConfig = Configuration['jwt'];
export type ThrottleConfig = Configuration['security']['throttle'];
