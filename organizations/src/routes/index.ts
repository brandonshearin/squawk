import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";
import { Organization } from "../models/organization";

const router = express.Router();

router.get("/api/orgs", async (req: Request, res: Response) => {
  const organizations = await Organization.find({})
  res.status(200).send(organizations);
});

export { router as indexRouter };
