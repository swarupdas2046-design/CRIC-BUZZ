// mongodb query 
import userModel from "../model/user.model.js";

export default class UserRepo {
  async create(payload) {
      return await userModel.create(payload)
  }

  async findByEmail(email) {
    return await userModel.findOne({ email, isDeleted: false }).lean();
  }
    
  async findSuperAdmin() {
    return userModel.findOne({ role: "SUPER_ADMIN" });
  }

  async findAll() {
    return await userModel.find({ isDeleted: false }).select("-password").lean();
  }

  async findById(id) {
    return await userModel.findOne({ _id: id, isDeleted: false }).select("-password").lean();
  }

  async updateById(id, payload) {
    return await userModel.findByIdAndUpdate(
      id, payload,
      { new: true }
    ).select("-password");
  }

  async softDelete(id) {
    return await userModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }
}