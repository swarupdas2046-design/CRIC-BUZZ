import PlayerModel from "./player.model.js";

export default class PlayerRepository {
  async create(data) {
    return await PlayerModel.create(data);
  }

  async findAll() {
    return await PlayerModel.find({ isDeleted: false });
  }

  async findById(id) {
    return await PlayerModel.findOne({ _id: id, isDeleted: false });
  }

  async updateById(id, data) {
    return await PlayerModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      {
        new: true,
      },
    );
  }

  async softDelete(id, updatedBy) {
    return await PlayerModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy },
      { new: true },
    );
  }
}
