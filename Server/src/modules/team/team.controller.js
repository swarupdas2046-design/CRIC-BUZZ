import TeamService from "./team.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class TeamController {
  constructor() {
    this.teamService = new TeamService();
  }

  async createTeam(req, res) {
    const userId = req.user?.id || req.user?._id;
    const created = await this.teamService.createTeam(req.validated, userId);
    buildSuccessResponse(res, "Team created", 201, created);
  }

  async getTeams(req, res) {
    const list = await this.teamService.getTeams();
    buildSuccessResponse(res, "Teams fetched", 200, list);
  }

  async getTeamById(req, res) {
    const item = await this.teamService.getTeamById(req.params.id);
    buildSuccessResponse(res, "Team fetched", 200, item);
  }

  async updateTeam(req, res) {
    const userId = req.user?.id || req.user?._id;
    const updated = await this.teamService.updateTeam(
      req.params.id,
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Team updated", 200, updated);
  }

  async deleteTeam(req, res) {
    const userId = req.user?.id || req.user?._id;
    const deleted = await this.teamService.deleteTeam(req.params.id, userId);
    buildSuccessResponse(res, "Team deleted", 200, deleted);
  }
}
