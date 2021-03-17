import { InputType, Field } from "type-graphql";

@InputType()
export class AddOrgInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;

  @Field()
  phone: string;

  @Field()
  website: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  description: string;
}
