import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";
import { Comment } from "../models/comment";

const router = express.Router();

router.delete(
  "/api/comments/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Comment.findByIdAndDelete(id);
    res.status(204).send({});
  }
);

export { router as deleteRouter };
