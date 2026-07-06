import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientInstance };

export const prisma: PrismaClientInstance =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" }),
  });

// Reuse the client across hot reloads in dev to avoid connection buildup.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
