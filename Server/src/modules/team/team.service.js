import TeamRepository from "./team.repository.js";
import { ConflictError, NotFound } from "../../shared/error/app.error.js";

export default class TeamService {
  constructor() {
    this.teamRepo = new TeamRepository();
  }

  async createTeam(data, userId) {
    // unique checks
    const existsName = await this.teamRepo.findByName(data.name);
    if (existsName) throw new ConflictError("Team name must be unique");

    const existsShort = await this.teamRepo.findByShortName(data.shortName);
    if (existsShort) throw new ConflictError("Team shortName must be unique");

    const payload = { ...data, createdBy: userId, updatedBy: userId };
    return await this.teamRepo.create(payload);
  }

  async getTeams() {
    return await this.teamRepo.findAll();
  }

  async getTeamById(id) {
    const team = await this.teamRepo.findById(id);
    if (!team) throw new NotFound("Team not found");
    return team;
  }

  async updateTeam(id, data, userId) {
    if (data.name) {
      const existing = await this.teamRepo.findByName(data.name);
      if (existing && existing._id.toString() !== id.toString()) {
        throw new ConflictError("Team name must be unique");
      }
    }

    if (data.shortName) {
      const existing = await this.teamRepo.findByShortName(data.shortName);
      if (existing && existing._id.toString() !== id.toString()) {
        throw new ConflictError("Team shortName must be unique");
      }
    }

    const payload = { ...data, updatedBy: userId };
    const updated = await this.teamRepo.updateById(id, payload);
    if (!updated) throw new NotFound("Team not found");
    return updated;
  }

  async deleteTeam(id, userId) {
    const deleted = await this.teamRepo.softDelete(id, userId);
    if (!deleted) throw new NotFound("Team not found");
    return deleted;
  }
}
