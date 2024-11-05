import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";
import { SubscribersOnAuthors, User } from "@prisma/client";
import { IContextDataLoader } from "../dataLoader/interface.js";

interface UserFields extends User {
  userSubscribedTo?: SubscribersOnAuthors[];
  subscribedToUser?: SubscribersOnAuthors[];
}

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      async resolve(user: User, _, context: IContextDataLoader) {
        const { profiles } = context;

        return profiles.load(user.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(user: User, _, context: IContextDataLoader) {
        const { posts } = context;
        const res = await posts.load(user.id);
        return [res];
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(userData: UserFields, _, context: IContextDataLoader) {
        const { user } = context;
        return user.loadMany(
          userData.userSubscribedTo?.map((s) => s.authorId) || []
        );
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve(userData: UserFields, _, context: IContextDataLoader) {
        const { user } = context;
        return user.loadMany(
          userData.subscribedToUser?.map((s) => s.subscriberId) || []
        );
      },
    },
  }),
});
