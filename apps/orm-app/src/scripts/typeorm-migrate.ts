import { migrateToLatest } from '@rfjs/orm-typeorm';
import { configs, dbConfig } from '@/configs';

export async function runTypeormMigrate() {
  console.log('Running TypeORM migrations with config:', {
    ...dbConfig,
    password: '***',
  });
  await migrateToLatest(dbConfig, configs.schema);
}

runTypeormMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
