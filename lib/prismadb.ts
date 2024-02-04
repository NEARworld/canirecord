import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const prisma = globalThis.prisma;

globalThis.prisma = globalThis.prisma ?? new PrismaClient();

// const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production")
// globalThis.prisma = globalThis.prisma ?? new PrismaClient();

export { prisma };
