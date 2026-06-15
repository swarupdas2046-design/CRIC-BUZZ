import PublicMatchService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicMatchController {
  constructor() {
    this.matchService = new PublicMatchService();
  }

  async getMatches(req, res) {
    const status = req.query.status || "LIVE";
    const limit = parseInt(req.query.limit) || 10;
    const matches = await this.matchService.getMatchesByStatus(status, limit);
    buildSuccessResponse(res, "Matches fetched", 200, matches);
  }

  async getMatchById(req, res) {
    const match = await this.matchService.getMatchById(req.params.id);
    buildSuccessResponse(res, "Match fetched", 200, match);
  }

  async getMatchCenter(req, res) {
    const data = await this.matchService.getMatchCenter(req.params.id);
    buildSuccessResponse(res, "Match center fetched", 200, data);
  }

  async getScorecard(req, res) {
    const data = await this.matchService.getScorecard(req.params.id);
    buildSuccessResponse(res, "Scorecard fetched", 200, data);
  }
}
