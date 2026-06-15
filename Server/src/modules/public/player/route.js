import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import PublicPlayerController from "./controller.js";

const router = express.Router();
const controller = new PublicPlayerController();

router.get(
  "/",
  createCacheMiddleware("players"),
  asyncHandler(controller.getAllPlayers.bind(controller)),
);

router.get(
  "/:id",
  createCacheMiddleware("players"),
  asyncHandler(controller.getPlayerById.bind(controller)),
);

export default router;
