import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";
import { PostType } from "../types/post.js";
import { MemberType, MemberTypeEnum } from "../types/member.js";
import { ProfileType } from "../types/profile.js";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(MemberType)),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeEnum) },
      },
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserType)),
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
    },
    profile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(ProfileType)),
    },
  },
});
