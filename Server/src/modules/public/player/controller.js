import PublicPlayerService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicPlayerController {
  constructor() {
    this.playerService = new PublicPlayerService();
  }

  async getAllPlayers(req, res) {
    const players = await this.playerService.getAllPlayers();
    buildSuccessResponse(res, "Players fetched", 200, players);
  }

  async getPlayerById(req, res) {
    const player = await this.playerService.getPlayerById(req.params.id);
    buildSuccessResponse(res, "Player fetched", 200, player);
  }
}
