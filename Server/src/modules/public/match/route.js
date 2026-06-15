import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import PublicMatchController from "./controller.js";

const router = express.Router();
const controller = new PublicMatchController();

router.get(
  "/",
  createCacheMiddleware("matches"),
  asyncHandler(controller.getMatches.bind(controller)),
);

router.get(
  "/:id",
  createCacheMiddleware("matches"),
  asyncHandler(controller.getMatchById.bind(controller)),
);

router.get(
  "/:id/center",
  createCacheMiddleware("matches"),
  asyncHandler(controller.getMatchCenter.bind(controller)),
);

router.get(
  "/:id/scorecard",
  createCacheMiddleware("matches"),
  asyncHandler(controller.getScorecard.bind(controller)),
);

export default router;
