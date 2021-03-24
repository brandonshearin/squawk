import { ObjectType, Field, registerEnumType, ID } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from "@typegoose/typegoose";

export enum UserType {
  Parent = "PARENT",
  Patient = "PATIENT",
}

registerEnumType(UserType, {
  name: "UserType",
});
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
  @Field((type) => ID)
  readonly id: string;

  @Field({ defaultValue: "" })
  @Property({ unique: true, required: true })
  username!: string;

  @Field({ defaultValue: "" })
  @Property({ required: true })
  email!: string;

  @Field({ nullable: true })
  @Property()
  phone?: string;

  @Field((type) => UserType, { nullable: true, defaultValue: null })
  @Property({ enum: UserType, addNullToEnum: true })
  parentOrPatient?: UserType;

  // @Field({ nullable: true })
  // @Property()
  // parentOrPatient?: string;

  @Field(() => [String], { defaultValue: [] })
  @Property({ type: [String], default: [] })
  educationalConsultants: string[];

  @Field(() => [String], { defaultValue: [] })
  @Property({ type: [String], default: [] })
  tbs: string[];

  @Field(() => [String], { defaultValue: [] })
  @Property({ type: [String], default: [] })
  rtc: string[];

  @Field({ defaultValue: false })
  @Property({ default: false })
  verified?: boolean;
}

export const UserProfileModel = getModelForClass(UserProfile);
