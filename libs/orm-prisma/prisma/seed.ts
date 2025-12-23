import 'dotenv/config';
import { createDb } from '@/db';
import { seedRecords } from '@/seeds/index';

const prisma = createDb(process.env.DATABASE_URL!);

async function main() {
  for (const [key, seed] of Object.entries(seedRecords)) {
    console.log(`Seeding ${key}...`);
    await seed(prisma);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
