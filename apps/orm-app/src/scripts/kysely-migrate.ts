import { migrateToLatest } from '@rfjs/orm-kysely';
import { configs } from '@/configs';

export async function runKyselyMigrate() {
  // With the new build setup, migrations are copied to dist/migrations
  // and migrateToLatest defaults to finding them there.
  console.log('Running migrations with url:', configs.dbUrl);

  await migrateToLatest(configs.dbUrl ?? '', configs.schema);
}

runKyselyMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
