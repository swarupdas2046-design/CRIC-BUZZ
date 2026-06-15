import z from "zod";
import { validateObjectId } from "../../users/validators/objectId.validator.js";
import { SeriesStatus } from "../series.model.js";

const createSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().optional(),
  season: z.string().min(1),
  status: z.enum(Object.values(SeriesStatus)).optional(),
  logo: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  shortName: z.string().optional(),
  season: z.string().min(1).optional(),
  status: z.enum(Object.values(SeriesStatus)).optional(),
  logo: z.string().optional(),
});

export const validateSeriesId = (req, res, next) => {
  if (!validateObjectId(req.params.id)) {
    return next(new Error("Invalid id"));
  }

  next();
};

export const validateCreateSeries = (req, res, next) => {
  try {
    req.validated = createSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateSeries = (req, res, next) => {
  try {
    req.validated = updateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
