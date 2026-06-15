import MatchModel from "./match.model.js";

export default class MatchRepository {
  async existsBySeries(seriesId) {
    return await MatchModel.exists({ series: seriesId, isDeleted: false });
  }
}
