import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  CommentUpdatedEvent,
  CommentDeletedEvent,
} from "@bscommon/common";
import { queueGroupName } from "./queue-group-name";
import { CommentModel } from "../../entities/comment";
import { OrgModel } from "../../entities/organization";
import { ObjectId } from "mongodb";
export class CommentDeletedEventListener extends Listener<CommentDeletedEvent> {
  subject: Subjects.CommentDeleted = Subjects.CommentDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentDeletedEvent["data"], msg: Message) {
    const { orgId, commentId } = data;

    const org = await OrgModel.findById(orgId);
    if (!org) {
      console.log("couldnt find org by id");
      return;
    }
    console.log(org);

    org.comments.filter((id) => {
      console.log(id);
      return id !== new ObjectId(commentId);
    });
    org.save();

    console.log(org);

    // step 2: delete the comment from its collection
    const response = await CommentModel.findByIdAndDelete(commentId);

    console.log(response?.id);
    msg.ack();
  }
}
