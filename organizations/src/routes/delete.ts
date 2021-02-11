import express, { Request, Response } from "express";
import { requireAuth } from "@bscommon/common";
import { Organization } from "../models/organization";

const router = express.Router();

router.delete(
  "/api/orgs/:orgId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orgId } = req.params;
    const response = await Organization.findByIdAndDelete(orgId);
    console.log(response);
    res.status(204).send({});
  }
);

export { router as deleteRouter };
