import * as Joi from 'joi';

const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
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
});

const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
};

export { validationSchema, validationOptions };
