import { Publisher, Subjects, CommentDeletedEvent } from "@bscommon/common";

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
  subject: Subjects.CommentDeleted = Subjects.CommentDeleted;
}
