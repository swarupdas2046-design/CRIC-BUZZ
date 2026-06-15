import UserService from "./user.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req, res) {
    const users = await this.userService.getAllUsers();
    return buildSuccessResponse(res, "Users fetched successfully", 200,
      { count: users.length, users }
    );
  }

  async getUserById(req, res) {
    const user = await this.userService.getUserById(req.params.id);
    return buildSuccessResponse(res, "User fetched", 200, user);
  }

  async updateUser(req, res) {
    const user = await this.userService.updateUser(req.params.id, req.body );
    return buildSuccessResponse(res,"User updated successfully",200,user);
  }

  async changeRole(req, res) {
    const user = await this.userService.changeRole( req.params.id,req.body.role);
    return buildSuccessResponse(res,"Role updated successfully",200,user);
  }
  
  async deleteUser(req, res) {
    await this.userService.deleteUser(req.params.id);
    return buildSuccessResponse(res,"User deleted successfully",200,null);
  }
}
