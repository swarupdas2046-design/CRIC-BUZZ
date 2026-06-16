import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";
import { CommentaryType } from "../commentary.model.js";

const addCommentarySchema = z.object({
  matchId: z.string().min(1),
  over: z.number().int().min(0),
  ball: z.number().int().min(1).max(6),
  text: z.string().min(1),
  type: z.enum(Object.values(CommentaryType)).optional(),
});

export const validateCommentaryId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid commentary id"));
  }
  next();
};

export const validateMatchId = (req, res, next) => {
  if (!validateObjectId(req.params.matchId)) {
    return next(new Error("Invalid match id"));
  }
  next();
};

export const validateAddCommentary = (req, res, next) => {
  try {
    req.validated = addCommentarySchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
