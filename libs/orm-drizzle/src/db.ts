import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { getConnectionStringInfo } from '@/utils';

/**
 * initializes a new database connection using the provided connection string and returns both the client and the database instance
 *
 * @param connectionString - The connection string for the database
 * @returns An object containing the client and the database instance
 */
export function createDb(
  connectionString: string,
  targetSchema?: string,
): {
  pool: Pool;
  db: NodePgDatabase<typeof schema>;
  hasSearchPath: boolean;
} {
  const { finalConnectionString, hasSearchPath } = getConnectionStringInfo(
    connectionString,
    targetSchema,
  );
  // We need to connect the client.
  const pool = new Pool({
    connectionString: finalConnectionString,
  });
  const db = drizzle(pool, { schema });
  return {
    pool,
    db,
    hasSearchPath,
  };
}
