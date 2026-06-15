import TeamModel from "../../team/team.model.js";

export default class PublicTeamRepository {
  async findAll(limit = 50) {
    return await TeamModel.find({ isDeleted: false })
      .sort({ name: 1 })
      .limit(limit)
      .lean();
  }

  async findById(id) {
    return await TeamModel.findOne({ _id: id, isDeleted: false })
      .populate("squad")
      .lean();
  }

  async findByNameRegex(regex, limit = 10) {
    return await TeamModel.find({
      name: regex,
      isDeleted: false,
    })
      .limit(limit)
      .lean();
  }
}
