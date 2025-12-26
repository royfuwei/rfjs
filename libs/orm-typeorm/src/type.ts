export type * from 'typeorm';

export type DbConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  logging: boolean;
  applicationName?: string;
};
