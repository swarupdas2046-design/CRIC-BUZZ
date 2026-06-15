import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";

const createSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  logo: z.string().min(1),
  primaryColor: z.string().optional(),
  squadPlayers: z.array(z.string()).optional(),
});


const updateSchema = z.object({
  name: z.string().min(1).optional(),
  shortName: z.string().min(1).optional(),
  logo: z.string().min(1).optional(),
  primaryColor: z.string().optional(),
});

export const validateTeamId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid id"));
  }

  next();
};

export const validateCreateTeam = (req, res, next) => {
  try {
    req.validated = createSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateTeam = (req, res, next) => {
  try {
    req.validated = updateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
