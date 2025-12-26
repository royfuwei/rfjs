import { DataSource } from 'typeorm';
import * as entities from './entities';
import * as migrations from './migrations';
import { DbConfig } from './type';

export const createDb = (config: DbConfig): DataSource => {
  const { host, port, database: name, user, password, logging, applicationName } = config;
  const dataSource = new DataSource({
    type: 'postgres',
    host: host,
    port: port,
    database: name,
    username: user,
    password,
    synchronize: true,
    logging,
    entities: Object.values(entities),
    migrations: Object.values(migrations),
    applicationName,
  });
  return dataSource;
};
