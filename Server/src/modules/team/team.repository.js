import TeamModel from "./team.model.js";

export default class TeamRepository {
  async create(payload) {
    return await TeamModel.create(payload);
  }

  async findAll() {
    return await TeamModel.find({ isDeleted: false });
  }

  async findById(id) {
    return await TeamModel.findOne({ _id: id, isDeleted: false });
  }

  async findByName(name) {
    return await TeamModel.findOne({ name, isDeleted: false }).lean();
  }

  async findByShortName(shortName) {
    return await TeamModel.findOne({ shortName, isDeleted: false }).lean();
  }

  async updateById(id, data) {
    return await TeamModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true },
    );
  }

  async softDelete(id, updatedBy) {
    return await TeamModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy },
      { new: true },
    );
  }

  async exists(filter) {
    return await TeamModel.exists({ ...filter, isDeleted: false });
  }

  // squad helpers
  async addPlayer(teamId, playerId) {
    return await TeamModel.findOneAndUpdate(
      { _id: teamId, isDeleted: false },
      { $addToSet: { squadPlayers: playerId } },
      { new: true },
    );
  }

  async removePlayer(teamId, playerId) {
    return await TeamModel.findOneAndUpdate(
      { _id: teamId, isDeleted: false },
      { $pull: { squadPlayers: playerId } },
      { new: true },
    );
  }
}
