import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { MemberTypeEnum } from "../resolvers/member.js";

export interface IProfileDto {
  userId: string;
  memberTypeId: string;
  isMale: boolean;
  yearOfBirth: number;
}

export const profileDto = new GraphQLInputObjectType({
  name: "CreateProfileInput",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLString) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeEnum) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
export const profileChangeDto = new GraphQLInputObjectType({
  name: "ChangeProfileInput",
  fields: () => ({
    memberTypeId: { type: MemberTypeEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
