import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default('postgres'),
  DATABASE_NAME: Joi.string().default('postgres'),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_LOCATION: Joi.string(),
  DATABASE_AUTO_SAVE: Joi.boolean().default(false),
  DATABASE_DROP_SCHEMA: Joi.boolean().default(false),
  DATABASE_LOGGING: Joi.boolean().default(false),
  DATABASE_CONNECTION_NAME: Joi.string().default('default'),
  JWT_TOKEN_SECRET: Joi.string().default(''),
  JWT_TOKEN_EXPIRES_IN: Joi.string().default('1s'),
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(10),
});

export const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
