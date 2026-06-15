import express from "express";
import AuthController from "./auth.controller.js";
import passport from "passport";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { validate } from "../../../middleware/validate.middleware.js";
import authValidator from "./auth.validator.js";

const router = express.Router();
const authController = new AuthController();

router.get( "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get( "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(authController.GoogleCallback.bind(authController)),
);


router.post("/register", validate(authValidator.register()),
  asyncHandler(authController.register.bind(authController))
);

router.post("/login", validate(authValidator.login()),
  asyncHandler(authController.login.bind(authController))
);

router.post( "/logout", asyncHandler( authController.logout.bind( authController)));

export default router;