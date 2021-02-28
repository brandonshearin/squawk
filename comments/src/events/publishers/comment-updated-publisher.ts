import { Publisher, Subjects, CommentUpdatedEvent } from "@bscommon/common";

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
}