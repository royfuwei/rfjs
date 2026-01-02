import { migrateToLatest, seedToLatest } from '@rfjs/orm-prisma';
import { configs } from '@/configs';

export async function migratePrisma() {
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  console.log('Running Prisma migrations with url:', configs.database.url);

  const schema = 'app_prisma';
  await migrateToLatest({
    connectionString: configs.database.url,
    schemaFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma/schema.prisma',
    configFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma.config.ts',
    schema,
  });

  await seedToLatest(configs.database.url, schema);
}

migratePrisma().catch((err) => {
  console.error(err);
  process.exit(1);
});
