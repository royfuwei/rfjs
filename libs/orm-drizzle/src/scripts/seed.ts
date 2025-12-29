import * as dotenv from 'dotenv';
import { seedRecords } from '../seeds';
import { createDb } from '@/db';

dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const { client, db } = createDb(connectionString);
  await client.connect();

  console.log('Running seeds...');

  for (const [key, seed] of Object.entries(seedRecords)) {
    console.log(`Seeding ${key}...`);
    await seed(db);
  }

  console.log('Seeds completed successfully.');

  await client.end();
}

main().catch((err) => {
  console.error('Seed failed!');
  console.error(err);
  process.exit(1);
});
