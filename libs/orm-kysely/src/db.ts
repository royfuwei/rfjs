// db.ts
import { Kysely, PostgresDialect } from 'kysely';
import { ClientConfig, Pool } from 'pg';

export function createDb<T>(clientConfig: ClientConfig, schema = 'public') {
  const dialect = new PostgresDialect({
    pool: new Pool(clientConfig),
  });

  const db = new Kysely<T>({ dialect });
  return db.withSchema(schema);
}
