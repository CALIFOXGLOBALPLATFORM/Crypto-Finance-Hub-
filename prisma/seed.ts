// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash the admin password securely
  const adminPassword = await bcrypt.hash('Richblood$100M', 10);

  // Create default SUPER_ADMIN user
  const admin = await prisma.user.upsert({
    where: { email: 'cryptofinancehub247@gmail.com' },
    update: {},
    create: {
      email: 'cryptofinancehub247@gmail.com',
      passwordHash: adminPassword,
      firstName: 'Crypto',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
    },
  });

  console.log('Admin user created:', admin.email);

  // Seed sample investment plans
  await prisma.investmentPlan.createMany({
    data: [
      {
        name: 'Starter Plan',
        description: 'Beginner-friendly investment option',
        currency: 'USD',
        minAmount: 100,
        maxAmount: 1000,
        duration: 30,
        status: 'ACTIVE',
      },
      {
        name: 'Pro Plan',
        description: 'Advanced investors with higher returns',
        currency: 'USD',
        minAmount: 1000,
        maxAmount: 10000,
        duration: 90,
        status: 'ACTIVE',
      },
      {
        name: 'Elite Plan',
        description: 'Exclusive plan for high-net-worth investors',
        currency: 'USD',
        minAmount: 10000,
        maxAmount: 100000,
        duration: 180,
        status: 'ACTIVE',
      },
    ],
  });

  console.log('Investment plans seeded');

  // Seed Trading Academy course
  const course = await prisma.academyCourse.create({
    data: {
      title: 'Introduction to Forex & Crypto Trading',
      description: 'Learn the basics of forex and cryptocurrency markets.',
      lessons: {
        create: [
          {
            title: 'Lesson 1: What is Forex?',
            content: 'Forex trading involves buying and selling currencies...',
            videoUrl: 'https://example.com/lesson1.mp4',
          },
          {
            title: 'Lesson 2: Introduction to Crypto',
            content: 'Cryptocurrency is a digital asset built on blockchain...',
            pdfUrl: 'https://example.com/lesson2.pdf',
          },
        ],
      },
    },
  });

  console.log('Academy course seeded:', course.title);
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