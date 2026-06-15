import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import PublicSeriesController from "./controller.js";

const router = express.Router();
const controller = new PublicSeriesController();

router.get(
  "/",
  createCacheMiddleware("series"),
  asyncHandler(controller.getAllSeries.bind(controller)),
);

router.get(
  "/:id",
  createCacheMiddleware("series"),
  asyncHandler(controller.getSeriesWithMatches.bind(controller)),
);

router.get(
  "/:id/matches",
  createCacheMiddleware("series"),
  asyncHandler(controller.getSeriesMatches.bind(controller)),
);

router.get(
  "/:id/points-table",
  createCacheMiddleware("pointsTable"),
  asyncHandler(controller.getPointsTable.bind(controller)),
);

export default router;
