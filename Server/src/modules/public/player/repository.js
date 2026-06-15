import PlayerModel from "../../player/player.model.js";

export default class PublicPlayerRepository {
  async findAll(limit = 50) {
    return await PlayerModel.find({ isDeleted: false })
      .sort({ name: 1 })
      .limit(limit)
      .lean();
  }

  async findById(id) {
    return await PlayerModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async findByNameRegex(regex, limit = 10) {
    return await PlayerModel.find({
      name: regex,
      isDeleted: false,
    })
      .limit(limit)
      .lean();
  }
}
