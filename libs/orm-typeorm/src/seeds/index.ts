import { DataSource } from 'typeorm';
import * as seed_2025_12_22_initial from './2025_12_22_initial';

export const seedRecords: Record<string, (db: DataSource) => Promise<void>> = {
  '2025_12_22-initial': seed_2025_12_22_initial.seed,
};
