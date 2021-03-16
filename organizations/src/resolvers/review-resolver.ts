import { Mutation, Arg, Ctx } from "type-graphql";
import { AddReviewInput } from "./inputs/add-review-input";
import { Context } from "../index";
import { Review, ReviewModel } from "../entities/review";
import { OrgModel } from "../entities/organization";
import { NotAuthorizedError, NotFoundError } from "@bscommon/common";

export class ReviewResolver {
  @Mutation(() => Review)
  async addReview(@Arg("data") newReview: AddReviewInput, @Ctx() ctx: Context) {
    // auth check
    if (!ctx.user) {
      throw new NotAuthorizedError();
    }
    // step 1: find org
    const org = await OrgModel.findById(newReview.organizationId);
    if (!org) {
      throw new NotFoundError();
    }
    // step 2: create review
    const review = await ReviewModel.create({
      ...newReview,
      userId: ctx.user.id,
      userEmail: ctx.user.email,
    });

    // step 3: update org
    org.reviews?.push(review.id);
    await org.save();
    return review;
  }
}
