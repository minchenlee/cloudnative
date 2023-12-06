import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const userModel = {
    createUser: async (email, username, password) => {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password
            }
        });
        return user;
    }
}

export { userModel };