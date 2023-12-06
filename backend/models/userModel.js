import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const userModel = {
    createUser: async (email, password, username, role) => {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
                username: username,
                role: role
            }
        });
        return user;
    },
    getUserById: async (id) => {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return user;
    },
}

export { userModel };