import { SCHEMA } from '@/consts';
import { createDb } from '@/db';
import { checkAndCreateDB } from './check-and-create-db';
import { checkAndCreateSchema } from './check-and-create-schema';
import { seedRecords } from '@/seeds';
import { getConnectionStringInfo } from '@/utils';

export async function seedToLatest(
  connectionString: string,
  defaultSchema = SCHEMA,
): Promise<void> {
  const { finalConnectionString, finalSchema, optionsSchemas } = getConnectionStringInfo(
    connectionString,
    defaultSchema,
  );
  // Use pg-connection-string for more robust parsing and to generate admin connection string
  // Default fallback
  const schemas: Set<string> = new Set();
  schemas.add(finalSchema);
  optionsSchemas.forEach((i) => schemas.add(i));
  console.log('Get schemas: ', Array.from(schemas.values()));

  await checkAndCreateDB(connectionString);
  await checkAndCreateSchema(connectionString, Array.from(schemas.values()));

  await runSeeds(finalConnectionString, finalSchema);
}

async function runSeeds(connectionString: string, schema: string) {
  let isConnected = false;
  const { pool, db } = createDb(connectionString);
  try {
    await pool.connect();
    isConnected = true;

    console.log('Running seeds...');

    for (const [key, seed] of Object.entries(seedRecords)) {
      console.log(`Seeding ${key}...`);
      await seed(db);
    }

    console.log('Seeds completed successfully.');

    await pool.end();
  } catch (e) {
    console.error('Migration failed!');
    console.error(e);
    throw e;
  } finally {
    if (isConnected) {
      await pool.end();
    }
  }
}
