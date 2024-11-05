import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import { IUserDto } from "../dto/user.js";

const prisma = new PrismaClient();

export const UserResolver = {
  user: async ({ id }: { id: UUID }) => {
    return await prisma.user.findUnique({ where: { id } });
  },
  users: async () => {
    return await prisma.user.findMany();
  },
  createUser: async ({ dto }: { dto: IUserDto }) => {
    return await prisma.user.create({
      data: dto,
    });
  },
  changeUser: async ({ id, dto }: { id: UUID; dto: Partial<IUserDto> }) => {
    return await prisma.user.update({
      where: { id },
      data: dto,
    });
  },
  deleteUser: async ({ id }: { id: UUID }) => {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return "";
  },
};
