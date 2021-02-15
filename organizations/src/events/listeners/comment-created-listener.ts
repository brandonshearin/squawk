import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  CommentCreatedEvent,
  TicketCreatedEvent,
} from "@bscommon/common";
import { queueGroupName } from "./queue-group-name";
import { Organization } from "../../models/organization";
import { Comment } from "../../models/comment";
export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: CommentCreatedEvent["data"], msg: Message) {
    const { id, content, organizationId, userEmail, userId } = data;

    // step 1: fetch specified organization
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      // TODO: Handle this error better
      console.log("organization");
    }

    // step 2: save comment document locally
    const newComment = Comment.build({
      content,
      id,
      userEmail,
    });
    const resp1 = await newComment.save();

    // step 3: add newComment to organizatin doc
    organization?.comments.push(newComment);
    const resp = await organization?.save();

    msg.ack();
  }
}
