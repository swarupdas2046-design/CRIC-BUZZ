import express from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import CommentaryController from "./commentary.controller.js";
import {
  validateAddCommentary,
  validateCommentaryId,
  validateMatchId,
} from "./validators/commentary.validator.js";

const router = express.Router();
const controller = new CommentaryController();
const allowedRoles = ["SUPER_ADMIN", "SCORER"];

router.post(
  "/",
  authenticate,
  authorize(allowedRoles),
  validateAddCommentary,
  asyncHandler(controller.addCommentary.bind(controller)),
);

router.delete(
  "/:id",
  authenticate,
  authorize(allowedRoles),
  validateCommentaryId,
  asyncHandler(controller.deleteCommentary.bind(controller)),
);

router.get(
  "/match/:matchId",
  authenticate,
  authorize(allowedRoles),
  validateMatchId,
  asyncHandler(controller.getCommentaryByMatch.bind(controller)),
);

export default router;
