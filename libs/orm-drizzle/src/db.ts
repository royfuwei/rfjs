import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

/**
 * initializes a new database connection using the provided connection string and returns both the client and the database instance
 *
 * @param connectionString - The connection string for the database
 * @returns An object containing the client and the database instance
 */
export function createDb(connectionString: string): {
  client: Client;
  db: NodePgDatabase<typeof schema>;
} {
  // We need to connect the client.
  const client = new Client({
    connectionString,
  });
  const db = drizzle(client, { schema });
  return {
    client,
    db,
  };
}
