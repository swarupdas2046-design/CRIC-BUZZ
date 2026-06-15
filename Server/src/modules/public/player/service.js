import PublicPlayerRepository from "./repository.js";
import { BadRequestError } from "../../../shared/error/app.error.js";
import { ensureId } from "../shared/query.js";

export default class PublicPlayerService {
  constructor() {
    this.repository = new PublicPlayerRepository();
  }

  async getAllPlayers() {
    return await this.repository.findAll();
  }

  async getPlayerById(id) {
    ensureId(id);
    const player = await this.repository.findById(id);
    if (!player) {
      throw new BadRequestError("Player not found");
    }
    return player;
  }

  async searchPlayers(regex, limit = 10) {
    return await this.repository.findByNameRegex(regex, limit);
  }
}
