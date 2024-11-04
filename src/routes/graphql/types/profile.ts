import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import { MemberType } from "./member.js";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: { type: UserType },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: { type: MemberType },
    memberTypeId: { type: GraphQLString },
  }),
});
