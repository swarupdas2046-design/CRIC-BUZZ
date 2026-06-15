import { NotFound } from "../../shared/error/app.error.js";
import PlayerRepository from "./player.repository.js";

export default class PlayerService {
  constructor() {
    this.playerRepository = new PlayerRepository();
  }

  async createPlayer(data, userId) {
    const payload = {
      ...data,
      createdBy: userId,
      updatedBy: userId,
    };

    return await this.playerRepository.create(payload);
  }

  async getPlayers() {
    return await this.playerRepository.findAll();
  }

  async getPlayerById(id) {
    const player = await this.playerRepository.findById(id);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async updatePlayer(id, data, userId) {
    const payload = {
      ...data,
      updatedBy: userId,
    };

    const player = await this.playerRepository.updateById(id, payload);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async deletePlayer(id, userId) {
    const player = await this.playerRepository.softDelete(id, userId);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }
}
