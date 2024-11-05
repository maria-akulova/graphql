import { UUID } from "crypto";
import { IUserDto } from "../dto/user.js";
import { IContextDataLoader } from "../dataLoader/interface.js";
import { GraphQLResolveInfo } from "graphql";
import { parseResolveInfo } from "graphql-parse-resolve-info";

export const UserResolver = {
  user: async ({ id }: { id: UUID }, context: IContextDataLoader) => {
    return await context.user.load(id);
  },
  users: async (_, context: IContextDataLoader, info: GraphQLResolveInfo) => {
    const resolvedInfo = parseResolveInfo(info);
    const users = await context.db.user.findMany({
      include: {
        userSubscribedTo:
          !!resolvedInfo?.fieldsByTypeName.User["userSubscribedTo"],
        subscribedToUser:
          !!resolvedInfo?.fieldsByTypeName.User["subscribedToUser"],
      },
    });
    users.forEach((u) => context.user.prime(u.id, u));
    return users;
  },
  createUser: async (
    { dto }: { dto: IUserDto },
    context: IContextDataLoader
  ) => {
    return await context.db.user.create({
      data: dto,
    });
  },
  deleteUser: async ({ id }: { id: UUID }, context: IContextDataLoader) => {
    await context.db.user.delete({
      where: {
        id,
      },
    });
    return "";
  },
  changeUser: async (
    { id, dto }: { id: UUID; dto: Partial<IUserDto> },
    context: IContextDataLoader
  ) => {
    return await context.db.user.update({
      where: { id },
      data: dto,
    });
  },
};
