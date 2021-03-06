import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

import { companyController } from "../controllers/companyController";

const router = Router();

//Get all articles a specific user
router.get("/", [checkJwt], companyController.listAllCompanies);
router.post(
  "/add",
  [checkJwt, checkRole(["ADMIN"])],
  companyController.addCompany
);

export default router;
