import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { app_config } from "../../constant/app.constant.js";

export const generateAccessToken = (payload) => {
  return jwt.sign( payload, env.ACCESS_TOKEN_SECRET, app_config.jwt.accessToken);
};

export const generateRefreshToken = (payload) => {
  return jwt.sign( payload, env.REFRESH_TOKEN_SECRET,app_config.jwt.refreshToken);
};