import { PrismaClient } from "@prisma/client";
import { GraphQLEnumType } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

const prisma = new PrismaClient();

export const MemberTypeEnum = new GraphQLEnumType({
  name: "MemberTypeId",
  description: "One of the member types",
  values: {
    [MemberTypeId.BASIC]: {
      value: MemberTypeId.BASIC,
      description: "Basic level, no preferences",
    },
    [MemberTypeId.BUSINESS]: {
      value: MemberTypeId.BUSINESS,
      description: "Business level with biggest ROI",
    },
  },
});

export const MemberResolver = {
  memberType: async ({ id }: { id: string }) => {
    return await prisma.memberType.findFirst({ where: { id } });
  },
  memberTypes: async () => {
    return await prisma.memberType.findMany();
  },
};
