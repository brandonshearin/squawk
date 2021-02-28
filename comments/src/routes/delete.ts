import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@bscommon/common";
import { Comment } from "../models/comment";
import { CommentDeletedPublisher } from "../events/publishers/comment-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";
import { check, query } from "express-validator";

const router = express.Router();

router.delete(
  "/api/comments",
  [query(["commentId, orgId"])],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    let commentId = req.query.commentId as string;
    let orgId = req.query.orgId as string;

    const response = await Comment.findByIdAndDelete(commentId);

    await new CommentDeletedPublisher(natsWrapper.client).publish({
      commentId,
      orgId,
    });

    res.status(204).send({});
  }
);

export { router as deleteRouter };
