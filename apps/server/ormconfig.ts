import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { UtilsService } from 'utils';

const isTestEnv = () => process.env.NODE_ENV === 'test';
const isLoggingEnabled = () => process.env.DATABASE_LOGGING === 'true';

const envFiles = ['.env', isTestEnv() ? '.env.test' : null].filter(Boolean);

envFiles.forEach((path) => {
  if (!fs.existsSync(path)) {
    return;
  }

  const envFile = dotenv.config({ path, override: true, debug: false });

  if (envFile.error) {
    throw envFile.error;
  }
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config').configuration();

if (isLoggingEnabled()) {
  console.table(UtilsService.flattenObject(config));
}

module.exports = config.database;
