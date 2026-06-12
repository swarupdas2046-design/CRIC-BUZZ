import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export let generateAccessToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET_ACCESS, {
    expiresIn: "15m",
  });
};

export let generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET_REFRESH, {
    expiresIn: "1d",
  });
};
