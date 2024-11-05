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
import { SubscriberType } from "./subscription.js";
import { User } from "@prisma/client";
import { getProfile } from "../resolvers/profile.js";
import { UUID } from "node:crypto";
import { getPosts } from "../resolvers/post.js";
import { SubscriptionResolver } from "../resolvers/subscription.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      async resolve(user: User) {
        return await getProfile.byUserId(user.id as UUID);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(user: User) {
        return await getPosts.byUserId(user.id as UUID);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(SubscriberType),
      async resolve(user: User) {
        return user;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(SubscriberType),
      async resolve(user: User) {
        return user;
      },
    },
  }),
});
