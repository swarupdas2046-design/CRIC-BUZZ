import MatchModel from "../../match/match.model.js";
import SeriesModel from "../../series/series.model.js";

export default class HomeRepository {
  async getLiveMatches(limit = 5) {
    return await MatchModel.find({ status: "LIVE", isDeleted: false })
      .populate("series", "name season")
      .populate("teams", "name shortName logo")
      .sort({ startAt: 1 })
      .limit(limit)
      .lean();
  }

  async getUpcomingMatches(limit = 5) {
    return await MatchModel.find({ status: "UPCOMING", isDeleted: false })
      .populate("series", "name season")
      .populate("teams", "name shortName logo")
      .sort({ startAt: 1 })
      .limit(limit)
      .lean();
  }

  async getRecentMatches(limit = 5) {
    return await MatchModel.find({ status: "COMPLETED", isDeleted: false })
      .populate("series", "name season")
      .populate("teams", "name shortName logo")
      .sort({ startAt: -1 })
      .limit(limit)
      .lean();
  }
}
