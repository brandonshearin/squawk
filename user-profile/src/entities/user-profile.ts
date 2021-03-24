import { ObjectType, Field } from "type-graphql";
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
export class UserProfile {
  @Field()
  @Property({ unique: true })
  username: string;
}

export const UserProfileModel = getModelForClass(UserProfile);
