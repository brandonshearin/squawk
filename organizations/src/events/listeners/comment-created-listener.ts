import { Message } from "node-nats-streaming";
import { Subjects, Listener, CommentCreatedEvent } from "@bscommon/common";
import { queueGroupName } from "./queue-group-name";
import { OrgModel } from "../../entities/organization";
import { CommentModel } from "../../entities/comment";
export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: CommentCreatedEvent["data"], msg: Message) {
    const { id, content, organizationId, userEmail, userId } = data;

    // step 1: fetch specified organization
    const organization = await OrgModel.findById(organizationId);
    if (!organization) {
      // TODO: Handle this error better
      console.log("organization is jank");
    }

    // step 2: save comment document locally
    const newComment = new CommentModel({
      content,
      _id: id,
      userEmail,
    });
    await newComment.save();

    // step 3: add newComment to organizatin doc
    organization?.comments.push(newComment);
    await organization?.save();

    msg.ack();
  }
}
