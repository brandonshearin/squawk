import { Publisher, Subjects, CommentCreatedEvent } from "@bscommon/common";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
}
