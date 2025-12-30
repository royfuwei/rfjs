import { execa } from 'execa';
import { checkAndCreateDB } from './check-and-create-db';
import { checkAndCreateSchema } from './check-and-create-schema';
import { getConnectionStringInfo } from '@/utils';

export type PrismaMigrateToLatestParams = {
  connectionString: string;
  schema?: string;
  // 你可以用 schema.prisma 檔來決定 multi-schema / search_path / @@schema 等配置
  schemaFilePath?: string; // e.g. "prisma/schema.prisma"
  // 如果你把 migrations 放在自訂資料夾，確保 prisma CLI 找得到它（通常是 prisma/migrations）
  cwd?: string; // monorepo/turbo libs 時常用
};

export async function migrateToLatest(
  params: PrismaMigrateToLatestParams,
): Promise<void> {
  const {
    connectionString,
    schema = 'public',
    schemaFilePath = 'prisma/schema.prisma',
    cwd,
  } = params;

  const { finalConnectionString, finalSchema, optionsSchemas } = getConnectionStringInfo(
    connectionString,
    schema,
  );

  const schemas = new Set<string>([finalSchema, ...optionsSchemas]);
  console.log('Get schemas:', [...schemas]);

  await checkAndCreateDB(finalConnectionString);
  await checkAndCreateSchema(finalConnectionString, [...schemas]);

  // Prisma migrate deploy 會讀 schema.prisma 的 datasource url
  // 最穩的做法：用 env 覆蓋 DATABASE_URL（避免你硬改檔案）
  await runPrismaMigrateDeploy({
    databaseUrl: finalConnectionString,
    schemaFilePath,
    cwd,
  });
}

async function runPrismaMigrateDeploy(opts: {
  databaseUrl: string;
  schemaFilePath: string;
  cwd?: string;
}) {
  const { databaseUrl, schemaFilePath, cwd } = opts;

  console.log('Running Prisma migrations (deploy)...');
  await execa('npx', ['prisma', 'migrate', 'deploy', '--schema', schemaFilePath], {
    stdio: 'inherit',
    cwd,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
  });
  console.log('Migrations completed successfully.');
}
