import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";

const bodySchema = z.object({
  playerId: z.string().min(1),
});

export const validateTeamId = (req, res, next) => {
  if (!validateObjectId(req.params.teamId)) {
    return next(new Error("Invalid team id"));
  }

  next();
};

export const validatePlayerIdParam = (req, res, next) => {
  if (!validateObjectId(req.params.playerId)) {
    return next(new Error("Invalid player id"));
  }

  next();
};

export const validateAddPlayerBody = (req, res, next) => {
  try {
    req.validated = bodySchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
