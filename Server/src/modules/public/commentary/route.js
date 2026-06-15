import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import PublicCommentaryController from "./controller.js";

const router = express.Router();
const controller = new PublicCommentaryController();

router.get(
  "/match/:matchId",
  createCacheMiddleware("commentary"),
  asyncHandler(controller.getCommentaryByMatch.bind(controller)),
);

export default router;
