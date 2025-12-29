import { configs } from '@/configs';
import { createDb, usersTable } from '@rfjs/orm-drizzle';

export const initDrizzle = () => {
  console.log('Initializing Drizzle...');
  // dbConfig contains user, database, password, etc.
  // We need to pass it to createDb which expects PoolConfig
  if (!configs.database.url) {
    throw new Error('DATABASE_URL is not defined');
  }
  return createDb(configs.database.url);
};

export const _testInitDrizzle = async () => {
  try {
    const { db, client } = initDrizzle();
    await client.connect();
    const allUsers = await db.select().from(usersTable).execute();
    console.log('Drizzle users:', allUsers);
    await client.end();
  } catch (e) {
    console.error('Drizzle init failed:', e);
  }
};
