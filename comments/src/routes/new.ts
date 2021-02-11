import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@bscommon/common";
import { body } from "express-validator";
import { Comment } from "../models/comment";

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
    const { id: userId } = req.currentUser!;

    const { content, orgId } = req.body;

    const comment = Comment.build({
      content,
      userId,
      orgId,
    });

    await comment.save();

    res.status(201).send(comment);
  }
);

export { router as newRouter };
