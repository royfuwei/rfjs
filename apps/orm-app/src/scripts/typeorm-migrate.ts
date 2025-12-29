import { migrateToLatest } from '@rfjs/orm-typeorm';
import { configs } from '@/configs';

export async function runTypeormMigrate() {
  console.log('Running TypeORM migrations with url:', configs.dbUrl);
  await migrateToLatest(configs.dbUrl ?? '', configs.schema);
}

runTypeormMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
