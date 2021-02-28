import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest } from "@bscommon/common";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import { natsWrapper } from "../nats-wrapper";
import { CommentUpdatedPublisher } from "../events/publishers/comment-updated-publisher";
const router = express.Router();

router.put(
  "/api/comments/:id",
  requireAuth,
  [body("content").notEmpty().withMessage("the comment must have content")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content: newContent } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new NotFoundError();
    }

    comment.content = newContent;
    await comment.save();

    await new CommentUpdatedPublisher(natsWrapper.client).publish({
      id,
      content: newContent,
    });

    res.send(comment);
  }
);

export { router as updateRouter };
