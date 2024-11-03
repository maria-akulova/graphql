import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const UserResolver = {
  user: async ({ id }: { id: UUID }) => {
    return await prisma.user.findUnique({ where: { id } });
  },
  users: async () => {
    return await prisma.user.findMany();
  },
};
