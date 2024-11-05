import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const createDataLoaders = (globalPrisma: PrismaClient) => {
  const prisma = globalPrisma;

  const userById = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const users = await prisma.user.findMany({
      where: {
        id: { in: localIds },
      },
      include: {
        subscribedToUser: true,
        userSubscribedTo: true,
      },
    });
    const sortedInIdsOrder = ids.map((id) => users.find((user) => user.id === id));
    return sortedInIdsOrder;
  };
  const profilesByUserId = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const profiles = await prisma.profile.findMany({
      where: {
        userId: { in: localIds },
      },
    });
    const sortedInIdsOrder = ids.map((id) =>
      profiles.find((profile) => profile.userId === id),
    );
    return sortedInIdsOrder;
  };
  const postsByUserId = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: localIds },
      },
    });
    const sortedInIdsOrder = ids.map((id) => posts.find((post) => post.authorId === id));
    return sortedInIdsOrder;
  };
  const subscribedTo = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const subs = await prisma.subscribersOnAuthors.findMany({
      where: {
        subscriberId: { in: localIds },
      },
      select: {
        subscriberId: true,
        author: true,
      },
    });
    const sortedInIdsOrder = ids.map(
      (id) => subs.find((sub) => sub.subscriberId === id)?.author,
    );
    return sortedInIdsOrder;
  };
  const subscribersFor = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const subs = await prisma.subscribersOnAuthors.findMany({
      where: {
        authorId: { in: localIds },
      },
      select: {
        subscriber: true,
        authorId: true,
      },
    });
    const sortedInIdsOrder = ids.map(
      (id) => subs.find((sub) => sub.authorId === id)?.subscriber,
    );
    return sortedInIdsOrder;
  };
  const memberType = async (ids: readonly string[]) => {
    const localIds = [...ids];
    const mems = await prisma.memberType.findMany({ where: { id: { in: localIds } } });
    const sortedInIdsOrder = ids.map((id) => mems.find((mem) => mem.id === id));
    return sortedInIdsOrder;
  };
  return {
    user: new DataLoader(userById),
    profiles: new DataLoader(profilesByUserId),
    posts: new DataLoader(postsByUserId),
    subscribedTo: new DataLoader(subscribedTo),
    subscribersFor: new DataLoader(subscribersFor),
    memberType: new DataLoader(memberType),
  };
};
