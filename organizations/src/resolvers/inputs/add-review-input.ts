import { InputType, Field } from "type-graphql";

@InputType()
export class AddReviewInput {
  @Field()
  organizationId: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  rating: number;
}
