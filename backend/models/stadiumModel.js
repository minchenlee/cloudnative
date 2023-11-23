import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const stadiumModel = {
    createStadium: async (sport, status, longitude, latitude, description, img_url, address, tel, createdById) => {
        const stadium = await prisma.stadium.create({
            data: {
                sport,
                status,
                longitude,
                latitude,
                description,
                img_url,
                address,
                tel,
                createdBy: {
                    connect: {
                        id: createdById
                    }
                }
            }
        });
        return stadium;
    }
}

export { stadiumModel };