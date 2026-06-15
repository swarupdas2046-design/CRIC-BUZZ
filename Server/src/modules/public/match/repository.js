import MatchModel from "../../match/match.model.js";
import ScoreModel from "../../score/score.model.js";

export default class PublicMatchRepository {
  async findByStatus(status, limit = 10) {
    return await MatchModel.find({ status, isDeleted: false })
      .populate("series", "name season")
      .populate("teams", "name shortName logo")
      .sort({ startAt: -1 })
      .limit(limit)
      .lean();
  }

  async findById(id) {
    return await MatchModel.findOne({ _id: id, isDeleted: false })
      .populate("series")
      .populate("teams")
      .lean();
  }

  async findByIdWithScores(id) {
    const match = await this.findById(id);
    if (!match) return null;

    const scores = await ScoreModel.find({ matchId: id })
      .populate("battingTeam", "name shortName logo")
      .sort({ innings: 1 })
      .lean();

    return { ...match, scores };
  }

  async findByIdCenter(id) {
    const match = await this.findById(id);
    if (!match) return null;

    const scores = await ScoreModel.find({ matchId: id })
      .populate("battingTeam", "name shortName logo")
      .sort({ innings: 1 })
      .lean();

    return {
      matchInfo: match,
      liveScore: scores,
      playingXI: match.playingXI || {},
      result: match.result || {},
    };
  }
}
