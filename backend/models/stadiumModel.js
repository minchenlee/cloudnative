import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())


const stadiumModel = {
    createStadium: async (name, sport, isIndoor, longitude, latitude, description, img_url, address, tel, openTime, closeTime, createdById) => {
        const stadium = await prisma.stadium.create({
            data: {
                name,
                sport,
                isIndoor,
                longitude,
                latitude,
                description,
                img_url,
                address,
                tel,
                openTime,
                closeTime,
                createdBy: {
                    connect: {
                        id: createdById
                    }
                }
            }
        });
        return stadium;
    },
    updateStadiumImageById: async (id, img_url) => {
        const stadium = await prisma.stadium.update({
            where: {
                id: parseInt(id)
            },
            data: {
                img_url: img_url
            }
        });
        return stadium;
    },
    getStadiumImageById: async (id) => {
        const stadium = await prisma.stadium.findUnique({
            where: {
                id: parseInt(id)
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return stadium;
    },
    deleteStadiumImageById: async (id) => {
        const stadium = await prisma.stadium.update({
            where: {
                id: parseInt(id)
            },
            data: {
                img_url: null
            }
        });
        return stadium;
    },
    getAllStadiums: async () => {
        const stadiums = await prisma.stadium.findMany({
            include: {
                createdBy: true
            },
            cacheStrategy: { swr: 60, ttl: 60 },
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
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return stadium;
    },
    updateStadiumById: async (id, name, sport, isIndoor, longitude, latitude, description, img_url, address, tel, createdById) => {
        const stadium = await prisma.stadium.update({
            where: {
                id: parseInt(id)
            },
            data: {
                sport: sport,
                name: name,
                isIndoor: isIndoor,
                longitude: longitude,
                latitude: latitude,
                description: description,
                img_url: img_url,
                address: address,
                tel: tel
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
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return stadiums;
    },
    getStadiumsByUserId: async (userId) => {
        const stadiums = await prisma.stadium.findMany({
            where: {
                createdById: parseInt(userId)
            }
        });
        return stadiums;
    },
}

export { stadiumModel };