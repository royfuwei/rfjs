import { migrateToLatest } from '@rfjs/orm-kysely';
import { configs, dbConfig } from '@/configs';

export async function runKyselyMigrate() {
  // With the new build setup, migrations are copied to dist/migrations
  // and migrateToLatest defaults to finding them there.
  console.log('Running migrations with config:', { ...dbConfig, password: '***' });

  await migrateToLatest(dbConfig, configs.schema);
}

runKyselyMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
