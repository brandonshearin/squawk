import express, { Request, Response } from "express";
import { NotFoundError } from "@bscommon/common";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/api/comments/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new NotFoundError();
  }
  res.status(200).send(comment);
});

export { router as showRouter };
