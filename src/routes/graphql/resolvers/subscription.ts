import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const SubscriptionResolver = {
  subscribeTo: async ({ id, authorId }: { id: UUID; authorId: UUID }) => {
    try {
      const user = prisma.user.update({
        where: { id },
        data: { userSubscribedTo: { create: { authorId } } },
      });
      return user;
    } catch {
      return null;
    }
  },
  unsubscribeFrom: async ({
    subscriberId,
    authorId,
  }: {
    subscriberId: UUID;
    authorId: UUID;
  }) => {
    try {
      await prisma.subscribersOnAuthors.delete({
        where: { subscriberId_authorId: { subscriberId, authorId } },
      });
    } catch {
      return null;
    }
  },
};
