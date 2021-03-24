import { UserProfile, UserProfileModel } from "../entities/user-profile";
import { Mutation, Arg, Ctx, Int, Resolver, Query } from "type-graphql";
import { Context } from "../index";
import { NotAuthorizedError } from "@bscommon/common";
import { CreateUserProfileInput } from "./input/create-user-profile-input";
@Resolver((of) => UserProfile)
export class UserProfileResolver {
  @Query(() => UserProfile)
  async getUserProfile(@Arg("id") id: string, @Ctx() ctx: Context) {
    if (ctx.user.id !== id) {
      throw new NotAuthorizedError();
    }
    const userprofile = await UserProfileModel.findById(id);
    console.log(userprofile);
    return userprofile;
  }

  @Mutation(() => UserProfile)
  async createUserProfile(
    @Arg("id") id: string,
    @Arg("data") data: CreateUserProfileInput
  ) {
    const newUserProfile = UserProfileModel.create({ _id: id, ...data });

    return newUserProfile;
  }
}
