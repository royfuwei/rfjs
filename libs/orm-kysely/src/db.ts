// db.ts
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database';

export function createDb(connectionString: string): {
  client: Pool;
  db: Kysely<Database>;
} {
  const pool = new Pool({
    connectionString,
  });

  const dialect = new PostgresDialect({
    pool,
  });

  const db = new Kysely<Database>({ dialect });
  return {
    client: pool,
    db: db.withSchema('public'),
  };
}
