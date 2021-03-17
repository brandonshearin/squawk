import {
  prop as Property,
  getModelForClass,
  modelOptions,
  mongoose,
  Ref,
} from "@typegoose/typegoose";
import { Field, ObjectType, ID } from "type-graphql";
import { Review } from "./review";

@ObjectType()
@modelOptions({
  schemaOptions: {
    toObject: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;

        // ret.comments?.map((comment: any) => {
        //   comment.id = comment._id;
        //   delete comment._id;
        // });
        return ret;
      },
    },
  },
})
export class Org {
  @Field(() => ID)
  readonly id: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  address: string;

  @Field()
  @Property()
  city: string;

  @Field()
  @Property()
  state: string;

  @Field()
  @Property()
  zipcode: string;

  @Field()
  @Property()
  phone: string;

  @Field()
  @Property()
  website: string;

  @Field({ nullable: true })
  @Property()
  type?: string;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field(() => [Review], { defaultValue: [], nullable: true })
  @Property({
    ref: () => Review,
    type: () => mongoose.Schema.Types.ObjectId,
    default: [],
  })
  reviews?: Ref<Review>[];
}

export const OrgModel = getModelForClass(Org);
