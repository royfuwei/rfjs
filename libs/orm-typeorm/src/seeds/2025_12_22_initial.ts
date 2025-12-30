import { TodoEntity, TodoEntityInsert } from '@/entities';
import { DataSource } from 'typeorm';

const todoData: TodoEntityInsert[] = [
  {
    content: 'alice@prisma.io',
    complete: false,
  },
];

export async function seed(db: DataSource): Promise<void> {
  const repo = db.getRepository(TodoEntity);
  repo.insert(todoData);
}
