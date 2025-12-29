import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client';

export function createDb(connectionString: string): {
  client: Pool;
  db: PrismaClient;
} {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  return {
    client: pool,
    db: prisma,
  };
}
