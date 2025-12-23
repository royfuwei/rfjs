import { ClientConfig, Client } from 'pg';
import { createDb } from '@/db';

export async function migrateToLatest(
  clientConfig: ClientConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schema = 'public',
): Promise<void> {
  await checkAndCreateDatabase(clientConfig);

  // Map ClientConfig to DbConfig
  // Ensure required fields are present or provide defaults/throw error
  const dbConfig = {
    host: clientConfig.host || 'localhost',
    port: clientConfig.port || 5432,
    database: clientConfig.database || 'postgres',
    username: clientConfig.user || 'postgres',
    password: (clientConfig.password as string) || '',
    synchronize: false, // We want to run migrations explicitly
    logging: true,
    applicationName: 'migration-script',
  };

  const dataSource = createDb(dbConfig);

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

async function checkAndCreateDatabase(clientConfig: ClientConfig) {
  const { database, ...config } = clientConfig;
  if (!database) return;

  const client = new Client({
    ...config,
    database: 'postgres',
  });

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
