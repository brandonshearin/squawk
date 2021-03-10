import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field()
  @Property()
  readonly id: ObjectId;

  @Field()
  @Property()
  content: string;

  @Field()
  @Property()
  userEmail: string;
}

export const CommentModel = getModelForClass(Comment);
