import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const courtModel = {
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
            }
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
            }
        });
        return court;
    },
    updateCourtById: async (id, status, stadiumId) => {
        const court = await prisma.court.update({
            where: {
                id: parseInt(id)
            },
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
    deleteCourtById: async (id) => {
        const court = await prisma.court.delete({
            where: {
                id: parseInt(id)
            }
        });
        return court;
    }
}

export { courtModel };
