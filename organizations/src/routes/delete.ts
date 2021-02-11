import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";

const router = express.Router();

router.delete(
  "/api/orgs/:orgId",
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as deleteRouter };
