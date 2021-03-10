import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Org, OrgModel } from "../entities/organization";
import { OrgInput } from "./input-types/org-input";
import { NotAuthorizedError, NotFoundError } from "@bscommon/common";
import { Context } from "../index";
import { ObjectIdScalar } from "../object-id.scalar";
import { ObjectId } from "mongodb";

@Resolver((of) => Org)
export class OrgResolver {
  @Query(() => [Org])
  async list() {
    const orgs = await OrgModel.find({});
    console.log(orgs);
    return orgs;
  }

  @Query(() => Org, { nullable: true })
  async get(@Arg("id", (type) => ObjectIdScalar) id: ObjectId) {
    const org = await OrgModel.findById(id).populate("comments");
    if (!org) {
      throw new NotFoundError();
    }
    return org;
  }

  @Mutation(() => Org)
  async create(@Arg("data") newOrg: OrgInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new NotAuthorizedError();
    }

    const org = new OrgModel({
      ...newOrg,
    });

    await org.save();
    return org;
  }

  @Mutation(() => Boolean)
  async delete(@Arg("id", (type) => ObjectIdScalar) id: ObjectId) {
    const response = await OrgModel.findByIdAndDelete(id);
    if (!response) {
      return false;
    }
    return true;
  }

  @FieldResolver({ nullable: true })
  comments(@Root() org: Org) {
    return [];
  }
}
