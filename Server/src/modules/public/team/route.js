import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import PublicTeamController from "./controller.js";

const router = express.Router();
const controller = new PublicTeamController();

router.get(
  "/",
  createCacheMiddleware("teams"),
  asyncHandler(controller.getAllTeams.bind(controller)),
);

router.get(
  "/:id",
  createCacheMiddleware("teams"),
  asyncHandler(controller.getTeamById.bind(controller)),
);

export default router;
