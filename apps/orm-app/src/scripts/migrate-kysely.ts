import { migrateToLatest, seedToLatest } from '@rfjs/orm-kysely';
import { configs } from '@/configs';

export async function migrateKysely() {
  // With the new build setup, migrations are copied to dist/migrations
  // and migrateToLatest defaults to finding them there.
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  const schema = 'app_kysely';
  console.log('Running migrations with url:', configs.database.url);

  await migrateToLatest({
    connectionString: configs.database.url,
    schema,
  });

  await seedToLatest(configs.database.url, schema);
}

migrateKysely().catch((err) => {
  console.error(err);
  process.exit(1);
});
