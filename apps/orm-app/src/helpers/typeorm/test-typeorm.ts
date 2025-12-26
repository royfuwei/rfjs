import { Repository, TodoEntity } from '@rfjs/orm-typeorm';
import { initDataSource } from './init-typeorm';

export async function testDataSource(): Promise<void> {
  const dataSource = await initDataSource();
  const repo: Repository<TodoEntity> = dataSource.getRepository(TodoEntity);
  const data = await repo.find();
  console.log('data: ', data);
}
