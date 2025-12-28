import { configs, dbConfig } from '@/configs';
import { createDb } from '@rfjs/orm-kysely';

export const initKysely = () => {
  console.log('Initializing Kysely...');
  const kysely = createDb(dbConfig, configs.database.schema);
  return kysely;
};

export const _testInitKysely = async () => {
  const kysely = initKysely();

  const users = await kysely.selectFrom('user').selectAll().execute();
  console.log('users: ', users);
};
