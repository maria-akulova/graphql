import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";
import { MemberType } from "./member.js";
import { UUIDType } from "./uuid.js";

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: { type: MemberType },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
