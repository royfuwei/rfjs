import { createDb } from '@rfjs/orm-prisma';
import { configs } from '@/configs';

export const init = async () => {
  console.log('Initializing Prisma...');
  console.log('db url: ', configs.dbUrl);
  const prisma = createDb(configs.dbUrl ?? '');

  const user = await prisma.user.findMany();
  console.log('user: ', user);
  return prisma;
};
