import { migrateToLatest, seedToLatest } from '@rfjs/orm-typeorm';
import { configs } from '@/configs';

export async function migrateTypeorm() {
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  const schema = 'app_typeorm';
  await migrateToLatest({
    connectionString: configs.database.url,
    schema,
  });

  await seedToLatest(configs.database.url, schema);
}

migrateTypeorm().catch((err) => {
  console.error(err);
  process.exit(1);
});
