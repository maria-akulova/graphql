import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../types/user.js";
import { userChangeDto, userDto } from "../dto/user.js";
import { ProfileType } from "../types/profile.js";
import { profileChangeDto, profileDto } from "../dto/profile.js";
import { PostType } from "../types/post.js";
import { postChangeDto, postDto } from "../dto/post.js";
import { UUIDType } from "../types/uuid.js";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: { type: UserType, args: { dto: { type: userDto } } },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: UUIDType },
        dto: { type: userChangeDto },
      },
    },

    createPost: { type: PostType, args: { dto: { type: postDto } } },
    changePost: {
      type: PostType,
      args: {
        id: { type: UUIDType },
        dto: { type: postChangeDto },
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },

    createProfile: { type: ProfileType, args: { dto: { type: profileDto } } },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
        dto: { type: profileChangeDto },
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
  }),
});
