import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";

const oversRegex = /^\d+\.[0-5]$/;

const createScoreSchema = z.object({
  matchId: z.string().min(1),
  innings: z.number().int().min(1).max(2),
  battingTeam: z.string().min(1),
  score: z.number().int().min(0),
  wickets: z.number().int().min(0).max(10),
  overs: z.string().regex(oversRegex),
  runRate: z.number().min(0),
  target: z.number().min(0).optional(),
});

const updateScoreSchema = z.object({
  matchId: z.string().min(1).optional(),
  innings: z.number().int().min(1).max(2).optional(),
  battingTeam: z.string().min(1).optional(),
  score: z.number().int().min(0).optional(),
  wickets: z.number().int().min(0).max(10).optional(),
  overs: z.string().regex(oversRegex).optional(),
  runRate: z.number().min(0).optional(),
  target: z.number().min(0).optional(),
});

export const validateScoreId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid score id"));
  }
  next();
};

export const validateMatchId = (req, res, next) => {
  if (!validateObjectId(req.params.matchId)) {
    return next(new Error("Invalid match id"));
  }
  next();
};

export const validateCreateScore = (req, res, next) => {
  try {
    req.validated = createScoreSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateScore = (req, res, next) => {
  try {
    req.validated = updateScoreSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
