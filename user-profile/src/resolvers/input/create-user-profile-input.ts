import { InputType, Field } from "type-graphql";
import { UserProfile, UserType } from "../../entities/user-profile";

@InputType()
export class CreateUserProfileInput implements Partial<UserProfile> {
  // required fields
  @Field()
  username: string;
  @Field()
  email: string;

  // optionals
  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  parentOrPatient: UserType;

  @Field(type => [String], { nullable: true })
  educationalConsultants: string[];

  @Field(type => [String], { nullable: true })
  tbs: string[];

  @Field(type => [String], { nullable: true })
  rtc: string[];
}
