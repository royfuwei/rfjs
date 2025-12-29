import 'dotenv/config';
import { Client, ClientConfig } from 'pg';
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

  console.log(`Dropping Schema: ${schema} from ${parse(connectionString).database}`);

  const config = parse(connectionString);
  // Remove database from config to connect to postgres/default if needed?
  // No, we can connect to the target DB and drop the schema.

  const client = new Client(config as ClientConfig);

  try {
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
    console.log(`Schema "${schema}" dropped successfully.`);
  } catch (error) {
    console.error('Error dropping schema:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
