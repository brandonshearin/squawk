import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Comment, CommentModel } from "./comment";
import { Ref } from "../types";

@ObjectType()
@modelOptions({
  schemaOptions: {
    toObject: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    collection: "organizations",
  },
})
export class Org {
  @Field()
  readonly id: ObjectId;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  city: string; // general region

  @Field()
  @Property()
  address: string; // specific addr

  @Field()
  @Property()
  phone: string;

  @Field()
  @Property()
  website: string;

  @Field()
  @Property({ nullable: true })
  description: string;

  @Field(() => [Comment])
  @Property({ ref: () => Comment, default: [] })
  comments: Ref<Comment>[];
}

export const OrgModel = getModelForClass(Org);
