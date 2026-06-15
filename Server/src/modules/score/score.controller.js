import ScoreService from "./score.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class ScoreController {
  constructor() {
    this.scoreService = new ScoreService();
  }

  async createScore(req, res) {
    const userId = req.user?.id || req.user?._id;
    const score = await this.scoreService.createScore(req.validated, userId);
    buildSuccessResponse(res, "Score created", 201, score);
  }

  async updateScore(req, res) {
    const userId = req.user?.id || req.user?._id;
    const score = await this.scoreService.updateScore(
      req.params.id,
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Score updated", 200, score);
  }

  async getScoresByMatch(req, res) {
    const scores = await this.scoreService.getScoresByMatch(req.params.matchId);
    buildSuccessResponse(res, "Scores fetched", 200, scores);
  }
}
