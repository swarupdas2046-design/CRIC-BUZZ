import express from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import MatchController from "./match.controller.js";
import {
  validateMatchId,
  validateCreateMatch,
  validateUpdateMatch,
  validateToss,
  validatePlayingXI,
} from "./validators/match.validator.js";

const router = express.Router();
const matchController = new MatchController();
const adminRoles = ["ADMIN", "SUPER_ADMIN"];

router.get(
  "/",
  authenticate,
  authorize(adminRoles),
  asyncHandler(matchController.getMatches.bind(matchController)),
);
router.get(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateMatchId,
  asyncHandler(matchController.getMatchById.bind(matchController)),
);
router.post(
  "/",
  authenticate,
  authorize(adminRoles),
  validateCreateMatch,
  asyncHandler(matchController.createMatch.bind(matchController)),
);
router.patch(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateMatchId,
  validateUpdateMatch,
  asyncHandler(matchController.updateMatch.bind(matchController)),
);
router.delete(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateMatchId,
  asyncHandler(matchController.deleteMatch.bind(matchController)),
);
router.patch(
  "/:id/toss",
  authenticate,
  authorize(adminRoles),
  validateMatchId,
  validateToss,
  asyncHandler(matchController.setToss.bind(matchController)),
);
router.patch(
  "/:id/playing-xi",
  authenticate,
  authorize(adminRoles),
  validateMatchId,
  validatePlayingXI,
  asyncHandler(matchController.setPlayingXI.bind(matchController)),
);

export default router;
