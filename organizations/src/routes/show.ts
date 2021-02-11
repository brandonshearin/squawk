import express, { Request, Response } from "express";
import { } from "@bscommon/common";

const router = express.Router();

router.get("/api/orgs/:orgId", async (req: Request, res: Response) => {
  res.send({});
});

export { router as showRouter };