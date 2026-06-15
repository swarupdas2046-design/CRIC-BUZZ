import express from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import ScoreController from "./score.controller.js";
import {
  validateCreateScore,
  validateUpdateScore,
  validateMatchId,
  validateScoreId,
} from "./validators/score.validator.js";

const router = express.Router();
const controller = new ScoreController();
const allowedRoles = ["SUPER_ADMIN", "SCORER"];

router.post(
  "/",
  authenticate,
  authorize(allowedRoles),
  validateCreateScore,
  asyncHandler(controller.createScore.bind(controller)),
);

router.patch(
  "/:id",
  authenticate,
  authorize(allowedRoles),
  validateScoreId,
  validateUpdateScore,
  asyncHandler(controller.updateScore.bind(controller)),
);

router.get(
  "/match/:matchId",
  authenticate,
  authorize(allowedRoles),
  validateMatchId,
  asyncHandler(controller.getScoresByMatch.bind(controller)),
);

export default router;
