import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";
import { IPostDto } from "../dto/post.js";

const prisma = new PrismaClient();

export const PostResolver = {
  post: async ({ id }: { id: UUID }) => {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  },
  posts: async () => {
    return await prisma.post.findMany();
  },
  createPost: async ({ dto }: { dto: IPostDto }) => {
    return await prisma.post.create({ data: dto });
  },
  changePost: async ({ id, dto }: { id: UUID; dto: Partial<IPostDto> }) => {
    return await prisma.post.update({
      where: { id },
      data: dto,
    });
  },
  deletePost: async ({ id }: { id: UUID }) => {
    await prisma.post.delete({ where: { id } });
    return "";
  },
};

export const getPosts = {
  byUserId: async (authorId: UUID) => {
    return await prisma.post.findMany({
      where: {
        authorId,
      },
    });
  },
};
