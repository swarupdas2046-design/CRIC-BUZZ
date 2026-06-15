import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";

const PlayerRole = z.enum([
  "BATSMAN",
  "BOWLER",
  "ALL_ROUNDER",
  "WICKET_KEEPER",
]);

export const createPlayerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  role: PlayerRole,
  country: z.string().min(1, "Country is required"),
  battingStyle: z.string().optional(),
  bowlingStyle: z.string().optional(),
});

export const updatePlayerSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().optional(),
  role: PlayerRole.optional(),
  country: z.string().min(1).optional(),
  battingStyle: z.string().optional(),
  bowlingStyle: z.string().optional(),
});

export const validatePlayerId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid id"));
  }

  next();
};

export const validateCreatePlayer = (req, res, next) => {
  try {
    req.validated = createPlayerSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdatePlayer = (req, res, next) => {
  try {
    req.validated = updatePlayerSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
