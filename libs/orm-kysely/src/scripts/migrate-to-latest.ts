import { Migrator } from 'kysely';
import { Client, ClientConfig } from 'pg';
import { parse } from 'pg-connection-string';
import { createDb } from '@/db';
import { migrations } from '@/migrations';

export async function migrateToLatest(
  connectionString: string,
  schema = 'public',
): Promise<void> {
  await checkAndCreateDatabase(connectionString);

  const { db } = createDb(connectionString);

  await db.schema.createSchema(schema).ifNotExists().execute();

  const migrator = new Migrator({
    db,
    migrationTableSchema: schema,
    provider: {
      // eslint-disable-next-line @typescript-eslint/require-await
      async getMigrations() {
        return migrations;
      },
    },
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
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
  // However, parse returns some fields as strings that might need to be numbers (port).
  // pg Client is flexible.
  // Using the object config directly with pg Client.

  const client = new Client(postgresConfig as ClientConfig);

  try {
    await client.connect();
    // Check if database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
      database,
    ]);

    if (res.rowCount === 0) {
      console.log(`Database "${database}" does not exist. Creating...`);
      // CREATE DATABASE cannot run in a transaction block
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
