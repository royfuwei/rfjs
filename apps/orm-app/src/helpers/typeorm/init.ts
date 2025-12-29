import { createDb, Repository, TodoEntity } from '@rfjs/orm-typeorm';
import { configs } from '@/configs';

export const initDataSource = async () => {
  console.log('Initializing Typeorm...');

  const { db: dataSource } = createDb(configs.dbUrl ?? '');
  await dataSource.initialize();
  return dataSource;
};

export async function _testDataSource(): Promise<void> {
  const dataSource = await initDataSource();
  const repo: Repository<TodoEntity> = dataSource.getRepository(TodoEntity);
  const data = await repo.find();
  console.log('data: ', data);
}
