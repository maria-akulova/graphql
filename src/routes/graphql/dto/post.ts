import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export interface IPostDto {
  authorId: string;
  content: string;
  title: string;
}

export const postDto = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
export const postChangeDto = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    authorId: { type: GraphQLString },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});
