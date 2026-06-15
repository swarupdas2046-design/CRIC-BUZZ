import PublicTeamRepository from "./repository.js";
import AppError from "../../../shared/error/app.error.js";
import { ensureId } from "../shared/query.js";

export default class PublicTeamService {
  constructor() {
    this.repository = new PublicTeamRepository();
  }

  async getAllTeams() {
    return await this.repository.findAll();
  }

  async getTeamById(id) {
    ensureId(id);
    const team = await this.repository.findById(id);
    if (!team) {
      throw new AppError("Team not found", 404);
    }
    return team;
  }

  async searchTeams(regex, limit = 10) {
    return await this.repository.findByNameRegex(regex, limit);
  }
}
