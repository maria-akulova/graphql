import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const SubscriptionResolver = {
  subscribeTo: async (
    p0: string,
    p1: string,
    {
      userId,
      authorId,
    }: {
      userId: UUID;
      authorId: UUID;
    }
  ) => {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userSubscribedTo: {
          create: {
            authorId: authorId,
          },
        },
      },
    });
  },
  unsubscribeFrom: async ({
    userId,
    authorId,
  }: {
    userId: UUID;
    authorId: UUID;
  }) => {
    await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId: authorId,
        },
      },
    });
    return "";
  },
};
