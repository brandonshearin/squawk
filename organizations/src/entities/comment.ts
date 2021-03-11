import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

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
  },
})
export class Comment {
  @Field()
  @Property()
  id: ObjectId;

  @Field()
  @Property()
  content: string;

  @Field()
  @Property()
  userEmail: string;
}

export const CommentModel = getModelForClass(Comment);
