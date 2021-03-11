import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@InputType()
export class CommentInput {
  @Field()
  content: string;

  @Field()
  organizationId: ObjectId;
}
