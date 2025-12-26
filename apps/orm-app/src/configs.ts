import dotenvFlow from 'dotenv-flow';
import { ClientConfig } from 'pg';

const flowEnv = dotenvFlow.config({
  node_env: process.env.NODE_ENV,
  default_node_env: 'development',
}).parsed;

process.env = {
  ...process.env,
  ...flowEnv,
};

export const dbConfig: ClientConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
};

const configs = {
  env: process.env.NODE_ENV,
  tz: process.env.TZ,
  name: process.env.APP_NAME,
  schema: process.env.DATABASE_SCHEMA,
  dbUrl: process.env.DATABASE_URL,
  dbConfig,
  database: {
    schema: process.env.DATABASE_SCHEMA,
    url: process.env.DATABASE_URL,
    log: process.env.DATABASE_LOGGING === 'true',
  },
};

export { configs };
