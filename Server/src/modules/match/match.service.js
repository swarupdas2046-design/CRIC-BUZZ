import { NotFound } from "../../shared/error/app.error.js";
import MatchRepository from "./match.repository.js";

export default class MatchService {
  constructor() {
    this.matchRepository = new MatchRepository();
  }

  async createMatch(matchData, userId) {
    return await this.matchRepository.create({...matchData, createdBy: userId });
  }

  async getMatches() {
    return await this.matchRepository.findAll();
  }

  async getMatchById(id) {
    const match = await this.matchRepository.findById(id);
    if (!match) {
      throw new NotFound("Match not found");
    }
    return match;
  }

  async updateMatch(id, matchData, userId) {
    const match = await this.matchRepository.updateById(id, {
      ...matchData,
      updatedBy: userId,
    });
    if (!match) {
      throw new NotFound("Match not found");
    }
    return match;
  }

  async deleteMatch(id, userId) {
    const match = await this.matchRepository.softDelete(id, userId);
    if (!match) {
      throw new NotFound("Match not found");
    }
    return match;
  }

  async setToss(id, tossData) {
    const match = await this.matchRepository.updateById(id, { toss: tossData });
    if (!match) {
      throw new NotFound("Match not found");
    }
    return match;
  }

  async setPlayingXI(id, playingXIData) {
    const match = await this.matchRepository.updateById(id, {
      playingXI: playingXIData,
    });
    if (!match) {
      throw new NotFound("Match not found");
    }
    return match;
  }
}
