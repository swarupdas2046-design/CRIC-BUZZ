import express from "express";
import TeamController from "./team.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  validateTeamId,
  validateCreateTeam,
  validateUpdateTeam,
} from "./validators/team.validator.js";
import SquadRouter from "../squad/squad.route.js";

const router = express.Router();
const controller = new TeamController();
const adminRoles = ["ADMIN", "SUPER_ADMIN"];

router.get(
  "/",
  authenticate,
  authorize(adminRoles),
  asyncHandler(controller.getTeams.bind(controller)),
);
router.get(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  asyncHandler(controller.getTeamById.bind(controller)),
);
router.post(
  "/",
  authenticate,
  authorize(adminRoles),
  validateCreateTeam,
  asyncHandler(controller.createTeam.bind(controller)),
);
router.patch(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  validateUpdateTeam,
  asyncHandler(controller.updateTeam.bind(controller)),
);
router.delete(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateTeamId,
  asyncHandler(controller.deleteTeam.bind(controller)),
);

// mount squad
router.use("/:teamId/squad", SquadRouter);

export default router;
