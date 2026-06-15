import MatchService from "./match.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  async createMatch(req, res) {
    const userId = req.user?.id || req.user?._id;
    const created = await this.matchService.createMatch(req.validated, userId);
    buildSuccessResponse(res, "Match created", 201, created);
  }

  async getMatches(req, res) {
    const matches = await this.matchService.getMatches();
    buildSuccessResponse(res, "Matches fetched", 200, matches);
  }

  async getMatchById(req, res) {
    const match = await this.matchService.getMatchById(req.params.id);
    buildSuccessResponse(res, "Match fetched", 200, match);
  }

  async updateMatch(req, res) {
    const userId = req.user?.id || req.user?._id;
    const updated = await this.matchService.updateMatch(
      req.params.id,
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Match updated", 200, updated);
  }

  async deleteMatch(req, res) {
    const userId = req.user?.id || req.user?._id;
    const deleted = await this.matchService.deleteMatch(req.params.id, userId);
    buildSuccessResponse(res, "Match deleted", 200, deleted);
  }

  async setToss(req, res) {
    const updated = await this.matchService.setToss(
      req.params.id,
      req.validatedToss,
    );
    buildSuccessResponse(res, "Toss set", 200, updated);
  }

  async setPlayingXI(req, res) {
    const updated = await this.matchService.setPlayingXI(
      req.params.id,
      req.validatedPlayingXI,
    );
    buildSuccessResponse(res, "Playing XI updated", 200, updated);
  }
}
