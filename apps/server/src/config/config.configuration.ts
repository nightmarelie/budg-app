export const configuration = () => ({
  port: parseInt(process.env.PORT),
  environment: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
    type: process.env.DATABASE_TYPE,
  },
  jwt: {
    secret: process.env.JWT_TOKEN_SECRET,
  },
  security: {
    throttleTtl: parseInt(process.env.THROTTLE_TTL),
    throttleLimit: parseInt(process.env.THROTTLE_LIMIT),
  },
});

export type Configuration = ReturnType<typeof configuration>;
