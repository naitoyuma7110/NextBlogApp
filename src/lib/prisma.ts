// 複数のclientインスタンスが存在しないようグローバルに登録
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // globalに存在するPrismaClientを取得、無ければ空オブジェクト
    const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
}; 
if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
}
    prisma = globalWithPrisma.prisma;
}

export default prisma;