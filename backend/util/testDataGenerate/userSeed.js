import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

// Generate random user data
function generateUser() {
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    role: 'PLAYER', // Adjust the user role as needed (ADMIN, PLAYER, VENDOR)
  };
}

async function seedUsers() {
  const numberOfUsers = 10; // Adjust the number of users you want to create

  for (let i = 0; i < numberOfUsers; i++) {
    const userData = generateUser();
    await prisma.user.create({
      data: userData,
    });
  }

  console.log('User data has been seeded into the database.');
}

seedUsers()
  .catch((error) => {
    console.error('Error seeding users:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });