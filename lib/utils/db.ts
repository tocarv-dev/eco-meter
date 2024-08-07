import { PrismaClient } from '@prisma/client';

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