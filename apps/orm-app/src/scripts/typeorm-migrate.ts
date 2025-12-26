import { DbConfig, migrateToLatest } from '@rfjs/orm-typeorm';
import { configs, dbConfig } from '@/configs';

export async function runTypeormMigrate() {
  const dataSourceConfig: DbConfig = {
    host: dbConfig.host ?? 'localhost',
    port: dbConfig.port ?? 5432,
    database: dbConfig.database ?? 'db',
    user: dbConfig.user ?? 'user',
    password: (dbConfig.password ?? 'password') as string,
    logging: configs.database.log,
  };
  console.log('Running TypeORM migrations with config:', {
    ...dataSourceConfig,
    password: '***',
  });
  await migrateToLatest(dataSourceConfig);
}

runTypeormMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
