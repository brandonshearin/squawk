import { ObjectType, ID, Field } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";

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
export class Review {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property()
  organizationId: string;

  @Field()
  @Property()
  userId: string;

  @Field()
  @Property()
  content: string;

  @Field()
  @Property()
  userEmail: string;

  @Field()
  @Property()
  rating: number;
}

export const ReviewModel = getModelForClass(Review);
