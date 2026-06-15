import express from "express";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { createCacheMiddleware } from "../shared/respond.js";
import HomeController from "./controller.js";

const router = express.Router();
const controller = new HomeController();

router.get(
  "/",
  createCacheMiddleware("home"),
  asyncHandler(controller.getHome.bind(controller)),
);

export default router;
