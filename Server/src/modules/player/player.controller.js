import PlayerService from "./player.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async createPlayer(req, res) {
    const userId = req.user?.id || req.user?._id;
    const player = await this.playerService.createPlayer(req.validated, userId);

    buildSuccessResponse(res, "Player created", 201, player);
  }

  async getPlayers(req, res) {
    const players = await this.playerService.getPlayers();

    buildSuccessResponse(res, "Players fetched", 200, players);
  }

  async getPlayerById(req, res) {
    const player = await this.playerService.getPlayerById(req.params.id);

    buildSuccessResponse(res, "Player fetched", 200, player);
  }

  async updatePlayer(req, res) {
    const userId = req.user?.id || req.user?._id;
    const player = await this.playerService.updatePlayer(
      req.params.id,
      req.validated,
      userId,
    );

    buildSuccessResponse(res, "Player updated", 200, player);
  }

  async deletePlayer(req, res) {
    const userId = req.user?.id || req.user?._id;
    const player = await this.playerService.deletePlayer(req.params.id, userId);

    buildSuccessResponse(res, "Player deleted", 200, player);
  }
}
