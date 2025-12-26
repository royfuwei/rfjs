import { createDb, DbConfig } from '@rfjs/orm-typeorm';
import { dbConfig, configs } from '@/configs';

export const initDataSource = async () => {
  console.log('Initializing Typeorm...');

  const dataSourceConfig: DbConfig = {
    host: dbConfig.host ?? 'localhost',
    port: dbConfig.port ?? 5432,
    database: dbConfig.database ?? 'db',
    user: dbConfig.user ?? 'user',
    password: (dbConfig.password ?? 'password') as string,
    logging: configs.database.log,
  };
  console.log('dataSourceConfig: ', {
    ...dataSourceConfig,
    password: '********',
  });
  const dataSource = createDb(dataSourceConfig);
  await dataSource.initialize();
  return dataSource;
};
