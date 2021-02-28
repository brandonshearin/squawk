import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  CommentUpdatedEvent,
  CommentDeletedEvent,
} from "@bscommon/common";
import { queueGroupName } from "./queue-group-name";
import { Comment } from "../../models/comment";
import { Organization } from "../../models/organization";

export class CommentDeletedEventListener extends Listener<CommentDeletedEvent> {
  subject: Subjects.CommentDeleted = Subjects.CommentDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentDeletedEvent["data"], msg: Message) {
    const { orgId, commentId } = data;

    const org = await Organization.findById(orgId);
    if (!org) {
      console.log("couldnt find org id");
      return;
    }

    org.comments.filter((comment) => comment.id !== commentId);
    org.save();

    // step 2: delete the comment from its collection
    const response = await Comment.findByIdAndDelete(commentId);

    console.log(response);

    msg.ack();
  }
}
