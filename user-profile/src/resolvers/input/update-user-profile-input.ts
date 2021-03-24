import { InputType, Field } from "type-graphql";
import { UserProfile, UserType } from "../../entities/user-profile";

@InputType()
export class UpdateUserProfileInput implements Partial<UserProfile> {
  // all fields can be optionally updated
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => UserType, { nullable: true })
  parentOrPatient?: UserType;

  @Field((type) => [String], { nullable: true })
  educationalConsultants?: string[];

  @Field((type) => [String], { nullable: true })
  tbs?: string[];

  @Field((type) => [String], { nullable: true })
  rtc?: string[];
}
