import { Org, OrgModel } from "../entities/organization";
import { ReviewModel, Review } from "../entities/review";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
} from "type-graphql";
import { NotFoundError, NotAuthorizedError } from "@bscommon/common";
import { AddOrgInput } from "./inputs/org-input";
import { AddReviewInput } from "./inputs/add-review-input";
import { Context } from "../index";

@Resolver((of) => Org)
export class OrgResolver {
  @Query(() => [Org])
  async list() {
    const orgs = await OrgModel.find({});
    return orgs;
  }

  @Query(() => Org)
  async get(@Arg("id") id: string) {
    const org = await OrgModel.findById(id);
    if (!org) {
      throw new NotFoundError();
    }
    return org;
  }

  @Mutation(() => Org)
  async add(@Arg("data") newOrg: AddOrgInput) {
    const org = OrgModel.create(newOrg);
    return org;
  }

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

  @FieldResolver()
  async reviews(@Root("id") orgId: string) {
    const reviews = await ReviewModel.find({ organizationId: orgId });
    console.log(reviews);
    return reviews;
  }
}
