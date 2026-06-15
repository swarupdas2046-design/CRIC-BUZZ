import TeamRepository from "../team/team.repository.js";
import PlayerModel from "../player/player.model.js";
import { ConflictError, NotFound } from "../../shared/error/app.error.js";

export default class SquadService {
  constructor() {
    this.teamRepo = new TeamRepository();
  }

  async getSquad(teamId) {
    const team = await this.teamRepo.getTeamById(teamId, true);

    if (!team) {
      throw new NotFound("Team not found");
    }

    // team.squadPlayers populated with player docs matching isDeleted:false
    return team.squadPlayers;
  }

  async addPlayerToSquad(teamId, playerId) {
    const team = await this.teamRepo.getTeamById(teamId);
    if (!team) {
      throw new NotFound("Team not found");
    }

    const player = await PlayerModel.findOne({
      _id: playerId,
      isDeleted: false,
    });
    if (!player) {
      throw new NotFound("Player not found");
    }

    // check duplicate
    const exists = team.squadPlayers.some(
      (p) => p.toString() === playerId.toString(),
    );
    if (exists) {
      throw new ConflictError("Player already in squad");
    }

    const updated = await this.teamRepo.addPlayer(teamId, playerId);
    if (!updated) {
      throw new NotFound("Team not found");
    }

    return updated;
  }

  async removePlayerFromSquad(teamId, playerId) {
    const team = await this.teamRepo.getTeamById(teamId);
    if (!team) {
      throw new NotFound("Team not found");
    }

    const found = team.squadPlayers.some(
      (p) => p.toString() === playerId.toString(),
    );
    if (!found) {
      throw new NotFound("Player not found in squad");
    }

    const updated = await this.teamRepo.removePlayer(teamId, playerId);
    if (!updated) {
      throw new NotFound("Team not found");
    }

    return updated;
  }
}
