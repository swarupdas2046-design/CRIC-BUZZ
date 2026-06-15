import MatchModel from "./match.model.js";

export default class MatchRepository {
  async create(payload) {
    return await MatchModel.create(payload);
  }

  async findAll() {
    return await MatchModel.find({ isDeleted: false });
  }

  async findById(id) {
    return await MatchModel.findOne({ _id: id, isDeleted: false });
  }

  async updateById(id, data) {
    return await MatchModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true },
    );
  }

  async softDelete(id, updatedBy) {
    return await MatchModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy },
      { new: true },
    );
  }

  async existsBySeries(seriesId) {
    const count = await MatchModel.countDocuments({
      series: seriesId,
      isDeleted: false,
    });
    return count > 0;
  }
}
