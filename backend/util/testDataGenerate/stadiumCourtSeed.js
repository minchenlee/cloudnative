import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sportsEnum = ['FOOTBALL', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS', 'TABLETENNIS'];
const statusOptions = ['Open', 'Closed', 'Under Maintenance'];

// Generate random stadium data
function generateStadium() {
  return {
    sport: sportsEnum[Math.floor(Math.random() * sportsEnum.length)],
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    longitude: faker.location.longitude(),
    latitude: faker.location.latitude(),
    description: {
      capacity: faker.number.int({ min: 1000, max: 100000 }),
      facilities: faker.lorem.words(5),
    },
    img_url: faker.image.url(),
    address: faker.location.streetAddress(),
    tel: faker.phone.number(),
  };
}

// Generate random court data
function generateCourt() {
  return {
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
  };
}

async function seedDatabase() {
  const numberOfStadiums = 10; // Adjust the number of stadiums you want to create

  for (let i = 0; i < numberOfStadiums; i++) {
    const stadiumData = generateStadium();
    const stadium = await prisma.stadium.create({
      data: {
        ...stadiumData,
        createdBy: { connect: { id: 1 } }, // Assuming user with ID 1 is the creator
      },
    });

    const numberOfCourts = Math.floor(Math.random() * 5) + 1; // Generate 1 to 5 courts per stadium
    for (let j = 0; j < numberOfCourts; j++) {
      const courtData = generateCourt();
      console.log(courtData)
      await prisma.court.create({
        data: {
          ...courtData,
          stadium: { connect: { id: stadium.id } },
        },
      });
    }
  }

  console.log('Sample data has been seeded into the database.');
}

seedDatabase()
  .catch((error) => {
    console.error('Error seeding the database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
