// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.organization.create({
    data: {
      name: 'A-MATE SPORTS',
      type: 'COMPANY',
      address: '27 rue Saint-Jacques 13006 Marseille, France',
      isActive: true,
    },
  });

  console.log('✅ Organization A-MATE SPORTS seeded');
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
