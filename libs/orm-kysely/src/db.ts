// db.ts
import { Kysely, PostgresDialect } from 'kysely';
import { ClientConfig, Pool } from 'pg';

export function createDb<T>(clientConfig: ClientConfig) {
  const dialect = new PostgresDialect({
    pool: new Pool(clientConfig),
  });

  return new Kysely<T>({ dialect });
}
