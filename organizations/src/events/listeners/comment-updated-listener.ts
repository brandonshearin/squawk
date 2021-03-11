import { Message } from "node-nats-streaming";
import { Subjects, Listener, CommentUpdatedEvent } from "@bscommon/common";
import { queueGroupName } from "./queue-group-name";
import { CommentModel } from "../../entities/comment";

export class CommentUpdatedEventListener extends Listener<CommentUpdatedEvent> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    const { id, content } = data;

    // step 1: find comment document locally
    const comment = await CommentModel.findById(id);
    if (!comment) {
      console.log("something is terriby wrong. comment id was jank");
      return;
    }

    console.log(comment);

    comment.content = content;
    await comment.save();

    msg.ack();
  }
}
