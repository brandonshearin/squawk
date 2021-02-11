import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";

const router = express.Router();

router.get("/api/orgs", async (req: Request, res: Response) => {
  res.send({});
});

export { router as indexRouter };
