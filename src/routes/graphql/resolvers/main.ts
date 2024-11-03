import { UserResolver } from "./users.js";

export const rootValue = {
  ...UserResolver,
};
