import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./user.js";
import { UUIDType } from "./uuid.js";

export const SubscriberType: GraphQLObjectType = new GraphQLObjectType({
  name: "Subscriber",
  fields: () => ({
    subscriber: { type: new GraphQLNonNull(UserType) },
    subscriberId: { type: new GraphQLNonNull(UUIDType) },
    author: { type: new GraphQLNonNull(UserType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
