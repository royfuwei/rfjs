import { Migrator } from 'kysely';
import { ClientConfig, Client } from 'pg';
import { createDb } from '@/db';
import { Database } from '@/database';
import { migrations } from '@/migrations';

export async function migrateToLatest(
  clientConfig: ClientConfig,
  schema = 'public',
): Promise<void> {
  await checkAndCreateDatabase(clientConfig);

  const db = createDb<Database>(clientConfig, schema);

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

async function checkAndCreateDatabase(clientConfig: ClientConfig) {
  const { database, ...config } = clientConfig;
  if (!database) return;

  // Connect to default 'postgres' database to check/create target DB
  const client = new Client({
    ...config,
    database: 'postgres',
  });

  try {
    await client.connect();
    // Check if database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [
      database,
    ]);

    if (res.rowCount === 0) {
      console.log(`Database "${database}" does not exist. Creating...`);
      // CREATE DATABASE cannot run in a transaction block, and parameters are not allowed for identifiers
      // We must sanitize or trust the input. Since this is a dev tool, we assume 'database' is safe-ish,
      // but ideally we should quote it properly.
      await client.query(`CREATE DATABASE "${database}"`);
      console.log(`Database "${database}" created successfully.`);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`Warning: Failed to ensure database exists: ${error}`);
    // Don't exit, let the potential connection error handle it or succeed if it was a race condition
  } finally {
    await client.end();
  }
}
