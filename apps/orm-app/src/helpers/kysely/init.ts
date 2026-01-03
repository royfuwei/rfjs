import { configs } from '@/configs';
import { migrateKysely } from '@/scripts/migrate-kysely';
import { createDb } from '@rfjs/orm-kysely';

export const initKysely = () => {
  console.log('Initializing Kysely...');
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  const { db: kysely } = createDb(configs.database.url);
  return kysely;
};

export const _testInitKysely = async () => {
  try {
    await migrateKysely();
    const kysely = initKysely();
    const users = await kysely.selectFrom('user').selectAll().execute();
    console.log('users: ', users);
    await kysely.destroy();
  } catch (error) {
    console.error('Error in _testInitKysely:', error);
  }
};
