import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import { IProfileDto } from "../dto/profile.js";

const prisma = new PrismaClient();

export const ProfileResolver = {
  profile: async ({ id }: { id: UUID }) => {
    const profile = await prisma.profile.findUnique({ where: { id } });
    return profile;
  },
  profiles: async () => {
    return await prisma.profile.findMany();
  },
  createProfile: async ({ dto }: { dto: IProfileDto }) => {
    return await prisma.profile.create({ data: dto });
  },
  changeProfile: async ({
    id,
    dto,
  }: {
    id: UUID;
    dto: Partial<IProfileDto>;
  }) => {
    return await prisma.profile.update({
      where: { id },
      data: dto,
    });
  },
  deleteProfile: async ({ id }: { id: UUID }) => {
    await prisma.profile.delete({ where: { id } });
    return "";
  },
};
