import { DataSource } from 'typeorm';
import * as entities from './entities';
import * as migrations from './migrations';

export const createDb = (
  connectionString: string,
): {
  client: DataSource;
  db: DataSource;
} => {
  const dataSource = new DataSource({
    type: 'postgres',
    url: connectionString,
    synchronize: false,
    logging: false,
    entities: Object.values(entities),
    migrations: Object.values(migrations),
  });
  return {
    client: dataSource,
    db: dataSource,
  };
};
