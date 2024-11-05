import { PrismaClient } from "@prisma/client";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export const SubscriptionResolver = {
  subscribeTo: async ({ id, authorId }: { id: UUID; authorId: UUID }) => {
    try {
      await prisma.subscribersOnAuthors.create({
        data: { subscriberId: id, authorId: authorId },
      });

      return "Subscribed successfully";
    } catch {
      return "Could not subscribe";
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
        where: {
          subscriberId_authorId: {
            subscriberId: subscriberId,
            authorId: authorId,
          },
        },
      });

      return "Unsubscribed successfully";
    } catch {
      return "Could not unsubscribe";
    }
  },
};
