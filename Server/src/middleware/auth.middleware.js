import jwt from "jsonwebtoken";
import env from "../config/env.js"
import { UnauthorizedError } from "../shared/error/app.error.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnauthorizedError("Access token not found");
    }

    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    req.user= payload;

    next();
  } catch(err) {
    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Access Token Expired');
    }

    throw new UnauthorizedError('Token Not Found');
  }
}



const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Forbidden", 403)
      );
    }

    next();
  };
};
