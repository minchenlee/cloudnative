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
    },
    getAllStadiums: async () => {
        const stadiums = await prisma.stadium.findMany({
            include: {
                createdBy: true
            }
        });
        return stadiums;
    },
    getStadiumById: async (id) => {
        const stadium = await prisma.stadium.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                createdBy: true
            }
        });
        return stadium;
    }
}

export { stadiumModel };