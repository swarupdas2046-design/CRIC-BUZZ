import express from "express";
import AuthController from "./auth.controller.js";
import passport from "passport";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";


const router = express.Router();
const authController = new AuthController();

router.get("/google", passport.authenticate('google', 
    { scope: ['profile', 'email'], prompt: "select_account" }
));

router.get('/google/callback', passport.authenticate('google', { session: false }),asyncHandler(
    authController.GoogleCallback.bind(authController)
));


export default router;