import * as dotenv from 'dotenv';
import * as fs from 'fs';

const isTestEnv = () => process.env.NODE_ENV === 'test';

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

module.exports = config.database;
