import { validateObjectId } from "../modules/users/validators/objectId.validator.js";

export const validateObjId = (req, res, next) => {
    if (!validateObjectId(req.params.id)) {
      return next(new NotFound("User not found"));
    }
    next();
}