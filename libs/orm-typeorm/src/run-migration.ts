import 'reflect-metadata';
import 'dotenv/config';
import { DbConfig } from './type';
import { migrateToLatest } from '@/scripts/migrate-to-latest';

async function main(): Promise<void> {
  const dbConfig: DbConfig = {
    host: process.env.DATABASE_HOST ?? 'localhost',
    user: process.env.DATABASE_USER ?? 'user',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    database: process.env.DATABASE ?? 'database',
    logging: process.env.DATABASE_LOGGING === 'true',
    port: Number(process.env.DATABASE_PORT ?? 5432),
  };
  await migrateToLatest(dbConfig);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
