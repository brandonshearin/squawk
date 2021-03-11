import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { Comment, CommentModel } from "../entities/comment";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../object-id.scalar";
import { NotAuthorizedError, NotFoundError } from "@bscommon/common";
import { Context } from "../index";
import { CommentInput } from "./types/comment-input";
import { CommentCreatedPublisher } from "../events/publishers/comment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { CommentDeletedPublisher } from "../events/publishers/comment-deleted-publisher";
import { CommentUpdatedPublisher } from "../events/publishers/comment-updated-publisher";

@Resolver((of) => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async list(@Arg("orgId", (type) => ObjectIdScalar) orgId: ObjectId) {
    const comments = await CommentModel.find({ organizationId: orgId });

    return comments;
  }

  @Query(() => Comment)
  async get(@Arg("id") id: ObjectId) {
    const comment = await CommentModel.findById(id);
    if (!comment) {
      throw new NotFoundError();
    }
    return comment;
  }

  @Mutation(() => Comment)
  async create(@Arg("data") newComment: CommentInput, @Ctx() context: Context) {
    if (!context.user) {
      throw new NotAuthorizedError();
    }

    const comment = new CommentModel({
      ...newComment,
      userId: context.user.id,
      userEmail: context.user.email,
    });

    await comment.save();

    await new CommentCreatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      content: comment.content,
      userId: context.user.id,
      userEmail: context.user.email,
      organizationId: comment.organizationId.toHexString(),
    });

    return comment;
  }

  @Mutation(() => Comment)
  async update(@Arg("id") id: ObjectId, @Arg("content") content: string) {
    const comment = await CommentModel.findById(id);
    if (!comment) {
      throw new NotFoundError();
    }

    comment.content = content;
    await comment.save();

    await new CommentUpdatedPublisher(natsWrapper.client).publish({
      id: id.toHexString(),
      content,
    });
    
    return comment;
  }

  @Mutation(() => Boolean)
  async delete(@Arg("id") id: ObjectId) {
    const response = await CommentModel.findByIdAndDelete(id);
    if (!response) {
      return false;
    }

    await new CommentDeletedPublisher(natsWrapper.client).publish({
      commentId: id.toHexString(),
      orgId: response.organizationId.toHexString(),
    });
    return true;
  }
}
