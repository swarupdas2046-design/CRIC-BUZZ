import express from "express";
import UserController from "./user.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { validateObjectId } from "./validators/objectId.validator.js";
import { NotFound } from "../../shared/error/app.error.js";
import { validateObjId } from "../../middleware/validateObjectId.middleware.js";

const router = express.Router();
const userController = new UserController();

router.get("/",authenticate,authorize( "SUPER_ADMIN","ADMIN"),
  asyncHandler( userController.getAllUsers.bind(userController))
);
router.get("/:id", authenticate,authorize("SUPER_ADMIN","ADMIN"),validateObjId,
  asyncHandler(userController.getUserById.bind(userController)),
);
router.patch("/:id",authenticate,authorize("SUPER_ADMIN","ADMIN"),validateObjId,
  asyncHandler(userController.updateUser.bind(userController))
);
router.patch("/:id/role",authenticate,authorize("SUPER_ADMIN"),
  asyncHandler(userController.changeRole.bind( userController))
);
router.delete("/:id",authenticate,authorize("SUPER_ADMIN"),validateObjId,
  asyncHandler(userController.deleteUser.bind( userController))
);

export default router;
