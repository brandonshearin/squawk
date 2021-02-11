import express, { Request, Response } from "express";
import { NotFoundError } from "@bscommon/common";
import { Organization } from "../models/organization";

const router = express.Router();

router.get("/api/orgs/:orgId", async (req: Request, res: Response) => {
  const { orgId } = req.params;
  const organization = await Organization.findById(orgId);
  if (!organization) {
    throw new NotFoundError();
  }
  res.status(200).send(organization);
});

export { router as showRouter };
