import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { createDb } from '@/db';

dotenv.config();

async function checkAndCreateDB(adminConnectionString: string, targetDb: string) {
  const client = new Client({
    connectionString: adminConnectionString,
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
      targetDb,
    ]);

    if (res.rowCount === 0) {
      console.log(`Database "${targetDb}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`Database "${targetDb}" created successfully.`);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`Warning: Failed to ensure database exists: ${error}`);
  } finally {
    await client.end();
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  // Use URL object for more robust parsing and to generate admin connection string
  let targetDb = 'orm'; // Default fallback
  try {
    const url = new URL(connectionString);
    targetDb = url.pathname.slice(1); // Remove leading slash

    // Create admin connection string pointing to 'postgres' database
    url.pathname = '/postgres';
    const adminConnectionString = url.toString();

    await checkAndCreateDB(adminConnectionString, targetDb);
  } catch (e) {
    console.warn(
      'Could not parse DATABASE_URL to create admin connection. Skipping auto-creation.',
      e,
    );
  }

  const { client, db } = createDb(connectionString);
  await client.connect();

  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations completed successfully.');

  await client.end();
}

main().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
});
