import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const UserResolver = {
  user: async ({ id }: { id: UUID }) => {
    return await prisma.user.findFirst({ where: { id } });
  },
  users: async () => {
    const usersSearch = await prisma.user.findMany();
    return usersSearch;
  },
};
