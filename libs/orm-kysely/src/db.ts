// db.ts
import { Kysely, PostgresDialect } from 'kysely';
import { ClientConfig, Pool } from 'pg';
import { Database } from './database';

export function createDb(
  clientConfig: ClientConfig,
  schema = 'public',
): Kysely<Database> {
  const dialect = new PostgresDialect({
    pool: new Pool(clientConfig),
  });

  const db = new Kysely<Database>({ dialect });
  return db.withSchema(schema);
}
