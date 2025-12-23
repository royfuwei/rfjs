import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as entities from './entities';
import * as migrations from './migrations';

type DbConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
  applicationName: string;
};

export const createDb = (config: DbConfig): DataSource => {
  const {
    host,
    port,
    database: name,
    username: user,
    password,
    synchronize,
    logging,
    applicationName,
  } = config;
  const dataSource = new DataSource({
    type: 'postgres',
    host: host,
    port: port,
    database: name,
    username: user,
    password: password,
    synchronize,
    logging,
    entities: Object.values(entities),
    migrations: Object.values(migrations),
    applicationName,
  });
  return dataSource;
};
