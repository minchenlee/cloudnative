import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const userModel = {
    createUser: async (username, password) => {
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        });
        return user;
    }
}

export { userModel };