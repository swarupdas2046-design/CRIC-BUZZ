import ScoreModel from "./score.model.js";

export default class ScoreRepository {
  async create(payload) {
    return await ScoreModel.create(payload);
  }

  async findById(id) {
    return await ScoreModel.findOne({ _id: id, isDeleted: false });
  }

  async findByMatch(matchId) {
    return await ScoreModel.find({ matchId, isDeleted: false }).sort({
      innings: 1,
    });
  }

  async findByMatchAndInnings(matchId, innings) {
    return await ScoreModel.findOne({ matchId, innings, isDeleted: false });
  }

  async updateById(id, data) {
    return await ScoreModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true },
    );
  }
}
