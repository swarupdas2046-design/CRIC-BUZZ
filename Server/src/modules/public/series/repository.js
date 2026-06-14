import SeriesModel from "../../series/series.model.js";
import MatchModel from "../../match/match.model.js";

export default class PublicSeriesRepository {
  async findAll(limit = 20) {
    return await SeriesModel.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }

  async findById(id) {
    return await SeriesModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async findMatchesBySeries(seriesId) {
    return await MatchModel.find({ series: seriesId, isDeleted: false })
      .populate("teams", "name shortName logo")
      .sort({ startAt: -1 })
      .lean();
  }

  async findCompletedMatchesBySeries(seriesId) {
    return await MatchModel.find({
      series: seriesId,
      status: "COMPLETED",
      isDeleted: false,
    })
      .populate("teams", "name shortName logo")
      .sort({ startAt: -1 })
      .lean();
  }
}
