// auth.validator.js

import Joi from "joi";

class AuthValidator {
  register() {
    return Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
      role: Joi.string()
        .valid("SUPER_ADMIN", "ADMIN", "SCORER")
        .optional(),
    });
  }

  login() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string(),
    });
  }
}

export default new AuthValidator();