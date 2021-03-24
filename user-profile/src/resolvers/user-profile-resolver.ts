import { UserProfile, UserProfileModel } from "../entities/user-profile";
import { Mutation, Arg, Ctx, Int, Resolver, Query } from "type-graphql";
import { Context } from "../index";
import { NotAuthorizedError, NotFoundError } from "@bscommon/common";
import { CreateUserProfileInput } from "./input/create-user-profile-input";
import { UpdateUserProfileInput } from "./input/update-user-profile-input";
// @Resolver((of) => UserProfile)
export class UserProfileResolver {
  @Query(() => UserProfile)
  async getUserProfile(@Arg("id") id: string, @Ctx() ctx: Context) {
    if (ctx.user.id !== id) {
      throw new NotAuthorizedError();
    }
    const userprofile = await UserProfileModel.findById(id);
    return userprofile;
  }

  @Query(() => [String])
  async listUserProfiles() {
    const profiles = await UserProfileModel.find({});
    return profiles.map((profile) => profile.id);
  }

  @Mutation(() => UserProfile)
  async createUserProfile(
    @Arg("id") id: string,
    @Arg("data") data: CreateUserProfileInput
  ) {
    const newUserProfile = UserProfileModel.create({ _id: id, ...data });

    return newUserProfile;
  }

  @Mutation(() => UserProfile)
  async updateUserProfile(
    @Arg("id") id: string,
    @Arg("data") data: UpdateUserProfileInput,
    @Ctx() ctx: Context
  ) {
    if (ctx.user.id !== id) {
      throw new NotAuthorizedError();
    }

    const profile = await UserProfileModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return profile;
  }
}
