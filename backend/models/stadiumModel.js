import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const stadiumModel = {
    createStadium: async (name, sport, status, longitude, latitude, description, img_url, address, tel, createdById) => {
        const stadium = await prisma.stadium.create({
            data: {
                name,
                sport,
                status,
                longitude,
                latitude,
                description,
                img_url,
                address,
                tel,
                isIndoor: false,
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
    },
    updateStadiumById: async (id, sport, status, longitude, latitude, description, img_url, address, tel, createdById) => {
        const stadium = await prisma.stadium.update({
            where: {
                id: parseInt(id)
            },
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
    deleteStadiumById: async (id) => {
        const stadium = await prisma.stadium.delete({
            where: {
                id: parseInt(id)
            }
        });
        return stadium;
    },
    getStadiumsBySport: async (sport) => {
        const stadiums = await prisma.stadium.findMany({
            where: {
                sport: sport.toUpperCase()
            }
        });
        return stadiums;
    }
}

export { stadiumModel };