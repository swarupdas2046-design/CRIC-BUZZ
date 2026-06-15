import PublicTeamService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicTeamController {
  constructor() {
    this.teamService = new PublicTeamService();
  }

  async getAllTeams(req, res) {
    const teams = await this.teamService.getAllTeams();
    buildSuccessResponse(res, "Teams fetched", 200, teams);
  }

  async getTeamById(req, res) {
    const team = await this.teamService.getTeamById(req.params.id);
    buildSuccessResponse(res, "Team fetched", 200, team);
  }
}
