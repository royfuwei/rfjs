import { createDb } from '@rfjs/orm-prisma';
import { configs } from '@/configs';

export const initPrisma = async () => {
  console.log('Initializing Prisma...');
  console.log('db url: ', configs.dbUrl);
  const { db: prisma } = createDb(configs.dbUrl ?? '');

  const user = await prisma.user.findMany();
  console.log('user: ', user);
  return prisma;
};
