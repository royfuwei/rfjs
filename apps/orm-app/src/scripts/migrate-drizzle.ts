import { migrateToLatest, seedToLatest } from '@rfjs/orm-drizzle';
import { configs } from '@/configs';

export async function migrateDrizzle() {
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  const schema = 'app_drizzle';

  // await migrateToLatest(configs.database.url, 'drizzle');
  await migrateToLatest({
    connectionString: configs.database.url,
    schema,
    migrationsFolder: 'node_modules/@rfjs/orm-drizzle/dist/drizzle',
  });

  await seedToLatest(configs.database.url, schema);
}

migrateDrizzle().catch((err) => {
  console.error(err);
  process.exit(1);
});
