import PublicMatchRepository from "./repository.js";
import { BadRequestError, NotFound } from "../../../shared/error/app.error.js";
import { ensureId, pagination } from "../shared/query.js";

export default class PublicMatchService {
  constructor() {
    this.repository = new PublicMatchRepository();
  }

  async getMatchesByStatus(status, limit = 10) {
    const validStatuses = ["LIVE", "UPCOMING", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      throw new NotFound("Invalid match status");
    }
    return await this.repository.findByStatus(status, limit);
  }

  async getMatchById(id) {
    ensureId(id);
    const match = await this.repository.findByIdWithScores(id);
    if (!match) {
      throw new BadRequestError("Match not found");
    }
    return match;
  }

  async getMatchCenter(id) {
    ensureId(id);
    const match = await this.repository.findByIdCenter(id);
    if (!match) {
      throw new BadRequestError("Match not found");
    }
    return match;
  }

  async getScorecard(id) {
    ensureId(id);
    const match = await this.repository.findByIdWithScores(id);
    if (!match) {
      throw new BadRequestError("Match not found");
    }
    return {
      innings1: match.scores?.find((s) => s.innings === 1) || null,
      innings2: match.scores?.find((s) => s.innings === 2) || null,
    };
  }
}
