import { PrismaClient } from '@prisma/client';
var bcrypt = require('bcryptjs');

const PrismaClientSingleToken = () => {
    return new PrismaClient();
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof PrismaClientSingleToken>
}

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleToken()

export default prisma;

if(process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export async function GetSurvey(id: string) {
    try {
        const query = await prisma.surveys.findUnique({
            where: {
                id: id
            }
        })

        return query;
    } catch (error) {
        console.log(error)
        throw new Error("Error getting surveys")
    }
}

export async function addReaction(id: string, reaction: string) {
    try {
        const query = await prisma.surveys.update({
            where: {
                id: id
            },
            data: {
                reaction: reaction
            }
        })

        return query;
    } catch (error) {
        console.log(error)
        throw new Error("Error adding reaction")
    }
}

export async function registerSurvey(id: string, email: string) {
    try {
        await prisma.surveys.update({
            where: {
                id: id
            },
            data: {
                userid: email
            }
        })

        const password = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const encryptedPassword = bcrypt.hashSync(password, 8);

        await prisma.user.create({
            data: {
                email: email,
                password: encryptedPassword
            }
        })
        
        console.log(password)
        return password;
    } catch (error) {
        console.log(error)
        throw new Error("Error register user and survey!")
    }
}

export async function getUser(email: any) {
    try {
        const query = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return query || false;
    } catch (error) {
        console.log(error)
        throw new Error("Error getting user")
    }
}