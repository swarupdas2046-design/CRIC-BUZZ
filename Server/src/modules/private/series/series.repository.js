import SeriesModel from "./series.model.js";

export default class SeriesRepository {
  async create(payload) {
    return await SeriesModel.create(payload);
  }

  async findAll() {
    return await SeriesModel.find({ isDeleted: false });
  }

  async findById(id) {
    return await SeriesModel.findOne({ _id: id, isDeleted: false });
  }

  async findByName(name) {
    return await SeriesModel.findOne({ name, isDeleted: false }).lean();
  }

  async findBySeason(season) {
    return await SeriesModel.findOne({ season, isDeleted: false }).lean();
  }

  async updateById(id, data) {
    return await SeriesModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true },
    );
  }

  async softDelete(id, updatedBy) {
    return await SeriesModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, updatedBy },
      { new: true },
    );
  }

  async exists(filter) {
    return await SeriesModel.exists({ ...filter, isDeleted: false });
  }
}

// SWarup das
