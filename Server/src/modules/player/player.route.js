import express from "express";
import PlayerController from "./player.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  validateCreatePlayer,
  validateUpdatePlayer,
  validatePlayerId,
} from "./validators/player.validator.js";

const router = express.Router();
const playerController = new PlayerController();

const adminRoles = ["ADMIN", "SUPER_ADMIN"];

router.get(
  "/",
  authenticate,
  authorize(adminRoles),
  asyncHandler(playerController.getPlayers.bind(playerController)),
);

router.get(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validatePlayerId,
  asyncHandler(playerController.getPlayerById.bind(playerController)),
);

router.post(
  "/",
  authenticate,
  authorize(adminRoles),
  validateCreatePlayer,
  asyncHandler(playerController.createPlayer.bind(playerController)),
);

router.patch(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validatePlayerId,
  validateUpdatePlayer,
  asyncHandler(playerController.updatePlayer.bind(playerController)),
);

router.delete(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validatePlayerId,
  asyncHandler(playerController.deletePlayer.bind(playerController)),
);

export default router;
