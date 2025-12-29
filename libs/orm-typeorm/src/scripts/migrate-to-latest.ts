import { Client, ClientConfig } from 'pg';
import { parse } from 'pg-connection-string';
import { createDb } from '@/db';

export async function migrateToLatest(
  connectionString: string,
  schema = 'typeorm',
): Promise<void> {
  await checkAndCreateDatabase(connectionString);
  await checkAndCreateSchema(connectionString, schema);

  const { db: dataSource } = createDb(connectionString);

  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    // Run migrations
    const migrations = await dataSource.runMigrations();

    console.log(`Migrations executed: ${migrations.length}`);
    migrations.forEach((migration) => {
      console.log(`Migration ${migration.name} executed successfully.`);
    });
  } catch (err) {
    console.error('Error during migration execution:', err);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

async function checkAndCreateDatabase(connectionString: string) {
  // Extract database name from connection string
  const config = parse(connectionString);
  const database = config.database;

  if (!database) return;

  // Construct connection string for default 'postgres' database
  // We need to remove the database name from the config or replace it
  const postgresConfig = { ...config, database: 'postgres' };
  // pg-connection-string parse returns ConnectionOptions, but Client takes ConnectionConfig or string.
  // pg Client config accepts most of what parse returns.
  // pg Client is flexible.
  // Using the object config directly with pg Client.

  const client = new Client(postgresConfig as ClientConfig);

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
      database,
    ]);

    if (res.rowCount === 0) {
      console.log(`Database "${database}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${database}"`);
      console.log(`Database "${database}" created successfully.`);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`Warning: Failed to ensure database exists: ${error}`);
  } finally {
    await client.end();
  }
}

async function checkAndCreateSchema(connectionString: string, schema: string) {
  const config = parse(connectionString);
  const client = new Client(config as ClientConfig);

  try {
    await client.connect();
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`Warning: Failed to ensure schema exists: ${error}`);
  } finally {
    await client.end();
  }
}
