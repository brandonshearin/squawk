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
    timestamps: { createdAt: true, updatedAt: true },
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

  @Field({ nullable: true, defaultValue: "User only provided a rating" })
  @Property()
  content?: string;

  @Field()
  @Property()
  userEmail: string;

  @Field({ defaultValue: 3 })
  @Property({ default: 3 })
  rating: number;

  @Field(() => Date)
  createdAt: Date;

  @Field({ defaultValue: 0 })
  @Property({ default: 0, min: 0 })
  likes: number;

  @Field({ defaultValue: 0 })
  @Property({ default: 0, min: 0 })
  dislikes: number;
}

export const ReviewModel = getModelForClass(Review);
