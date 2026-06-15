import UserRepo from "../../repository/user.repository.js";
import { NotFound } from "../../shared/error/app.error.js";

export default class UserService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async getAllUsers() {
    return await this.userRepo.findAll();
  }

  async getUserById(id) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFound("User not found");
    }

    return user;
  }

  async updateUser(id, payload) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFound("User not found");
    }

    return await this.userRepo.updateById( id, payload );
  }

  async changeRole(id, role) {
    const user = await this.userRepo.findById(id);

    if (!user) { 
      throw new NotFound( "User not found");
    }

    return await this.userRepo.updateById( id, { role });
  }

  async deleteUser(id) {
    const user = await this.userRepo.findById(id);

    if (!user) 
      { throw new NotFoundError( "User not found" );
    }

    await this.userRepo.softDelete(id);
    return null;
  }
}