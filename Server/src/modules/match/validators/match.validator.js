import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";

const matchCreateSchema = z.object({
  series: z.string().min(1),
  teams: z.array(z.string().min(1)).min(2),
  startAt: z.string().optional(),
});

const matchUpdateSchema = z.object({
  series: z.string().min(1).optional(),
  teams: z.array(z.string().min(1)).min(2).optional(),
  startAt: z.string().optional(),
});

const tossSchema = z.object({
  tossWinner: z.string().min(1),
  electedTo: z.enum(["bat", "bowl"]),
  tossLoser: z.string().min(1).optional(),
});

const playingXISchema = z.object({
  teamId: z.string().min(1),
  players: z.array(z.string().min(1)).min(11),
});

export const validateMatchId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid match id"));
  }
  next();
};

export const validateCreateMatch = (req, res, next) => {
  try {
    req.validated = matchCreateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateMatch = (req, res, next) => {
  try {
    req.validated = matchUpdateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateToss = (req, res, next) => {
  try {
    req.validatedToss = tossSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validatePlayingXI = (req, res, next) => {
  try {
    req.validatedPlayingXI = playingXISchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
