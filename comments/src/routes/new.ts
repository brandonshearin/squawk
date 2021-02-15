import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@bscommon/common";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import { CommentCreatedPublisher } from "../events/publishers/comment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.post(
  "/api/comments",
  requireAuth,
  [
    body("orgId").notEmpty().withMessage("an organization id must be provided"),
    body("content").notEmpty().withMessage("the comment must have content"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // get user info from request context
    const { id: userId, email } = req.currentUser!;

    const { content, orgId } = req.body;

    const comment = Comment.build({
      content,
      userId,
      orgId,
      userEmail: email,
    });

    await comment.save();

    // publish that a new comment has been created
    await new CommentCreatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      content,
      organizationId: orgId,
      userEmail: email,
      userId,
    });

    res.status(201).send(comment);
  }
);

export { router as newRouter };
