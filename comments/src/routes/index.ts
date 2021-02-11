import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/api/comments/:orgId", async (req: Request, res: Response) => {
  const { orgId } = req.params;
  const comments = await Comment.find({
    orgId,
  });
  res.status(200).send(comments);
});

export { router as indexRouter };
