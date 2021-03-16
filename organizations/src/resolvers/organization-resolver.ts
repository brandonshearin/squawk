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
  @Query(() => [Org], { description: "list all organizations" })
  async list() {
    const orgs = await OrgModel.find({});
    return orgs;
  }

  @Query(() => Org, { description: "fetch one organization by id" })
  async get(@Arg("id") id: string) {
    const org = await OrgModel.findById(id);
    if (!org) {
      throw new NotFoundError();
    }
    return org;
  }

  @Mutation(() => Org, { description: "add new organization" })
  async addOrg(@Arg("data") newOrg: AddOrgInput) {
    const org = OrgModel.create(newOrg);
    return org;
  }

  @FieldResolver({
    description: "fetch the reviews associated with an organization",
  })
  async reviews(@Root("id") orgId: string) {
    const reviews = await ReviewModel.find({ organizationId: orgId });
    return reviews;
  }
}
