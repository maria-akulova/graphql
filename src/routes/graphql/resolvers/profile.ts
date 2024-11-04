import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const ProfileResolver = {
  profile: async ({ id }: { id: UUID }) => {
    const profile = await prisma.profile.findUnique({ where: { id } });
    return profile;
  },
  profiles: async () => {
    return await prisma.profile.findMany();
  },
};

export const getProfile = {
  byUserId: async (userId: UUID) => {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  },
};
