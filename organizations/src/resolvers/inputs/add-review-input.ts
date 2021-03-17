import { InputType, Field } from "type-graphql";

@InputType()
export class AddReviewInput {
  @Field()
  organizationId: string;

  @Field()
  content: string;

  @Field()
  rating: number;
}
