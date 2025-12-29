import 'reflect-metadata';
import 'dotenv/config';
import { migrateToLatest } from '@/scripts/migrate-to-latest';

import { parse } from 'pg-connection-string';

async function main(): Promise<void> {
  let connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    const host = process.env.DATABASE_HOST ?? 'localhost';
    const user = process.env.DATABASE_USER ?? 'user';
    const password = process.env.DATABASE_PASSWORD ?? 'password';
    const database = process.env.DATABASE ?? 'database';
    const port = process.env.DATABASE_PORT ?? 5432;

    connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;
  }

  const schema = process.env.DATABASE_SCHEMA ?? 'typeorm';

  // Use pg-connection-string to verify/log
  const config = parse(connectionString);
  console.log(`Target Database: ${config.database}`);
  console.log(`Target Schema: ${schema}`);

  await migrateToLatest(connectionString, schema);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
