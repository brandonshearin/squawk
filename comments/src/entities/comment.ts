import { ObjectType, Field } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

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
  },
})
export class Comment {
  @Field()
  readonly id: ObjectId;

  @Field()
  @Property()
  content: string;

  @Field()
  @Property()
  userEmail: string;

  @Field()
  @Property()
  userId: ObjectId;

  @Field()
  @Property()
  organizationId: ObjectId;
}

export const CommentModel = getModelForClass(Comment);
