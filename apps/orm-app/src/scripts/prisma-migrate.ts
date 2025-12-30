import { migrateToLatest } from '@rfjs/orm-prisma';
import { configs } from '@/configs';

export async function runPrismaMigrate() {
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  console.log('Running Prisma migrations with url:', configs.database.url);

  await migrateToLatest({
    connectionString: configs.database.url,
    schemaFilePath: 'prisma/schema.prisma',
  });
}

runPrismaMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
