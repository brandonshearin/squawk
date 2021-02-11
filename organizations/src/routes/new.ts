import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@bscommon/common";
import { Organization } from "../models/organization";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/orgs",
  requireAuth,
  [body("name").notEmpty().withMessage("a name for the organization must be provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, address, phone, website } = req.body;

    const organization = Organization.build({
      address,
      name,
      phone,
      website,
    });

    await organization.save()
    
    res.status(201).send(organization);
  }
);

export { router as newRouter };
