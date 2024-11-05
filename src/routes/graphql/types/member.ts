import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import { ProfileType } from "./profile.js";
import { MemberTypeEnum } from "../resolvers/member.js";

export const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeEnum) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    profile: { type: new GraphQLList(ProfileType) },
  }),
});
