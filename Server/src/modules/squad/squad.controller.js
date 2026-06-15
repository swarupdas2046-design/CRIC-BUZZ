import SquadService from "./squad.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class SquadController {
  constructor() {
    this.squadService = new SquadService();
  }

  async getSquad(req, res) {
    const { teamId } = req.params;
    const players = await this.squadService.getSquad(teamId);

    buildSuccessResponse(res, "Squad fetched", 200, players);
  }

  async addPlayerToSquad(req, res) {
    const { teamId } = req.params;
    const { playerId } = req.validated;

    const updatedTeam = await this.squadService.addPlayerToSquad(
      teamId,
      playerId,
    );

    buildSuccessResponse(res, "Player added to squad", 200, updatedTeam);
  }

  async removePlayerFromSquad(req, res) {
    const { teamId, playerId } = req.params;

    const updatedTeam = await this.squadService.removePlayerFromSquad(
      teamId,
      playerId,
    );

    buildSuccessResponse(res, "Player removed from squad", 200, updatedTeam);
  }
}
