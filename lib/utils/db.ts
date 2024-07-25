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