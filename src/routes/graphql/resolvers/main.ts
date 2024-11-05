import { MemberResolver } from "./member.js";
import { PostResolver } from "./post.js";
import { ProfileResolver } from "./profile.js";
import { SubscriptionResolver } from "./subscription.js";
import { UserResolver } from "./users.js";

export const rootValue = {
  ...UserResolver,
  ...PostResolver,
  ...MemberResolver,
  ...ProfileResolver,
  ...SubscriptionResolver,
};
