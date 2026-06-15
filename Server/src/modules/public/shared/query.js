import { isValidObjectId } from "mongoose";
import { BadRequestError } from "../../../shared/error/app.error.js";

export const ensureId = (id) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid id", 400);
  }
  return id;
};

export const pagination = (page = 1, limit = 50) => {
  const p = Math.max(1, parseInt(page) || 1);
  const l = Math.max(1, Math.min(100, parseInt(limit) || 50));
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
};

export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
