import { Mutation, Arg, Ctx, Int } from "type-graphql";
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
    } as Review);

    // step 3: update org
    org.reviews?.push(review.id);
    await org.save();
    return review;
  }

  @Mutation(() => Review)
  async editReview(
    @Arg("id") id: string,
    @Arg("content", { nullable: true }) content: string,
    @Arg("rating") rating: number,
    @Ctx() ctx: Context
  ) {
    // if not logged in, throw error
    if (!ctx.user) {
      throw new NotAuthorizedError();
    }

    const review = await ReviewModel.findById(id);
    if (!review) {
      throw new NotFoundError();
    }

    if (review.userId !== ctx.user.id) {
      throw new NotAuthorizedError();
    }

    review.content = content;
    review.rating = rating;
    await review.save();

    return review;
  }

  @Mutation(() => String)
  async deleteReview(@Arg("id") id: string, @Ctx() ctx: Context) {
    if (!ctx.user) {
      throw new NotAuthorizedError();
    }
    const review = await ReviewModel.deleteOne({
      _id: id,
      userId: ctx.user.id,
    });
    if (review.deletedCount) {
      return id;
    }
    return "";
  }

  @Mutation(() => Int)
  async like(@Arg("id") id: string, @Ctx() ctx: Context) {
    if (!ctx.user) {
      throw new NotAuthorizedError();
    }

    const review = await ReviewModel.findById(id);
    return 1;
  }
}
