import { createDb } from '@/db';
import { SCHEMA } from '@/consts';
import { MigrateToLatestParams } from '@/type';
import { getConnectionStringInfo } from '@/utils';
import { checkAndCreateDB } from './check-and-create-db';
import { checkAndCreateSchema } from './check-and-create-schema';

export async function migrateToLatest(params: MigrateToLatestParams): Promise<void> {
  const { connectionString, schema = SCHEMA, migrationsSchema } = params;
  const { finalConnectionString, finalSchema, optionsSchemas } = getConnectionStringInfo(
    connectionString,
    schema,
  );
  // Use pg-connection-string for more robust parsing and to generate admin connection string
  // Default fallback
  const schemas: Set<string> = new Set();
  // -csearch_path=

  schemas.add(finalSchema);
  optionsSchemas.forEach((i) => schemas.add(i));
  console.log('Get schemas: ', Array.from(schemas.values()));

  await checkAndCreateDB(finalConnectionString);
  await checkAndCreateSchema(finalConnectionString, Array.from(schemas.values()));
  if (migrationsSchema) {
    await checkAndCreateSchema(finalConnectionString, [migrationsSchema]);
  }

  const finalMigrationSchema = migrationsSchema || finalSchema;
  console.log('finalMigrationSchema: ', finalMigrationSchema);
  await runMigrations(finalConnectionString, finalMigrationSchema);
}

async function runMigrations(
  connectionString: string,
  finalMigrationSchema: string,
): Promise<void> {
  const { db: dataSource } = createDb(connectionString);

  dataSource.setOptions({
    migrationsTableName: finalMigrationSchema,
  });

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
