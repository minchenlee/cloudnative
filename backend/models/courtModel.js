import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

const courtModel = (prisma) => ({
    createCourt: async (status, stadiumId) => {
        const court = await prisma.court.create({
            data: {
                status,
                stadium: {
                    connect: {
                        id: stadiumId
                    }
                }
            }
        });
        return court;
    },
    getAllCourts: async () => {
        const courts = await prisma.court.findMany({
            include: {
                stadium: true
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return courts;
    },
    getCourtById: async (id) => {
        const court = await prisma.court.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                stadium: true
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        
        return court;
    },
    updateCourtById: async (id, status) => {
        
        const court = await prisma.court.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status
            }
        });

        return court;
    },
    deleteCourtById: async (id) => {
        const court = await prisma.court.delete({
            where: {
                id: parseInt(id)
            }
        });
        return court;
    },
    getCourtsByStadiumId: async (stadiumId) => {
        const court = await prisma.court.findMany({
            where: {
                stadiumId: parseInt(stadiumId)
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return court;
    }
});

export const defaultCourtModel = courtModel(prisma);
export { courtModel };
