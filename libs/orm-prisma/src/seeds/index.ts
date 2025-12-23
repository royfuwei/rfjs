import { PrismaClient } from '../../prisma/generated/client';
import * as seed_2025_12_22_initial from './2025_12_22_initial';

export const seedRecords: Record<string, (prisma: PrismaClient) => Promise<void>> = {
  '2025_12_22-initial': seed_2025_12_22_initial.seeds,
};
