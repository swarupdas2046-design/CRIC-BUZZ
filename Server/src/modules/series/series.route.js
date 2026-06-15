import express from "express";
import SeriesController from "./series.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  validateSeriesId,
  validateCreateSeries,
  validateUpdateSeries,
} from "./validators/series.validator.js";

const router = express.Router();
const controller = new SeriesController();

const adminRoles = ["ADMIN", "SUPER_ADMIN"];

router.get(
  "/",
  authenticate,
  authorize(adminRoles),
  asyncHandler(controller.getSeries.bind(controller)),
);
router.get(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateSeriesId,
  asyncHandler(controller.getSeriesById.bind(controller)),
);
router.post(
  "/",
  authenticate,
  authorize(adminRoles),
  validateCreateSeries,
  asyncHandler(controller.createSeries.bind(controller)),
);
router.patch(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateSeriesId,
  validateUpdateSeries,
  asyncHandler(controller.updateSeries.bind(controller)),
);
router.delete(
  "/:id",
  authenticate,
  authorize(adminRoles),
  validateSeriesId,
  asyncHandler(controller.deleteSeries.bind(controller)),
);

export default router;
