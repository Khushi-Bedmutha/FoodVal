import express from "express";
import { param } from "express-validator";
import IndustryController from "../controllers/IndustryController";


const router = express.Router();

router.get(
  "/:industryId",
  param("industryId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("industryId paramenter must be a valid string"),
  IndustryController.getIndustry
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City paramenter must be a valid string"),
  IndustryController.searchIndustry
);

export default router;