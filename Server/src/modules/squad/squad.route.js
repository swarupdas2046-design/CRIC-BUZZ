import express from "express";
import SquadController from "./squad.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  validateTeamId,
  validatePlayerIdParam,
  validateAddPlayerBody,
} from "./validators/squad.validator.js";

const router = express.Router({ mergeParams: true });
const controller = new SquadController();

const adminRoles = ["ADMIN", "SUPER_ADMIN"];

router.get(
  "/",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  asyncHandler(controller.getSquad.bind(controller)),
);

router.post(
  "/",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  validateAddPlayerBody,
  asyncHandler(controller.addPlayerToSquad.bind(controller)),
);

router.delete(
  "/:playerId",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  validatePlayerIdParam,
  asyncHandler(controller.removePlayerFromSquad.bind(controller)),
);

export default router;
