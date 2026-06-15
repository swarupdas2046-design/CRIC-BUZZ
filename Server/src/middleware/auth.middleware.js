import jwt from "jsonwebtoken";
import env from "../config/env.js"
import { UnAuthorize } from "../shared/error/app.error.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnAuthorize("Access token not found");
    }

    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    req.user= payload;

    next();
  } catch(err) {
    if (err.name === 'TokenExpiredError') {
      throw new UnAuthorize('Access Token Expired');
    }

    throw new UnAuthorize('Token Not Found');
  }
}

export const authenticate = authMiddleware;


export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new UnAuthorize("Invalid role")
      );
    }

    next();
  };
};
