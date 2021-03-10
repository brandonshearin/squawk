import { Field, InputType } from "type-graphql";

@InputType()
export class OrgInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  phone: string;

  @Field()
  website: string;

  @Field({ nullable: true })
  description?: string;
}
