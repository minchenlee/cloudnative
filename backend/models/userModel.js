import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


const userModel = {
    createUser: async (email, password, username, role, tel) => {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
                username: username,
                role: role,
                tel: tel
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
    getUserByEmail: async (email) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    },
    updateUser: async (id, username, password, tel, role) => {
        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                username: username,
                password: password,
                tel: tel,
                role: role
            }
        });
        return user;
    },
    deleteUser: async (id) => {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return user;
    },
    userLogin: async (email, password) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

export { userModel };