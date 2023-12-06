import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const userModel = {
    createUser: async (email, password, username, role) => {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password,
                role
            }
        });
        return user;
    }
}

export { userModel };