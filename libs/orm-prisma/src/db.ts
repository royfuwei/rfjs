import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client';

export function createDb(connectionString: string) {
  const adapter = new PrismaPg({
    connectionString,
  });

  const globalForPrisma = global as unknown as { prisma: PrismaClient };

  const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      adapter,
    });
  return prisma;
}
