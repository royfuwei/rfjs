import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/schema';
import * as seed_2025_12_22_initial from './2025_12_22_initial';

export const seedRecords: Record<
  string,
  (db: NodePgDatabase<typeof schema>) => Promise<void>
> = {
  '2025_12_22-initial': seed_2025_12_22_initial.seed,
};
