import { UserProfile } from "../entities/user-profile";
import { Mutation, Arg, Ctx, Int, Resolver, Query } from "type-graphql";
import { Context } from "../index";

@Resolver((of) => UserProfile)
export class UserProfileResolver {
  @Query(() => UserProfile)
  async getUserProfile() {
    return { username: "brandon", id: "123" };
  }

  @Mutation(() => UserProfile)
  async createUserProfile() {}
}
