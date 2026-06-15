import PublicCommentaryRepository from "./repository.js";
import { ensureId, pagination } from "../shared/query.js";

export default class PublicCommentaryService {
  constructor() {
    this.repository = new PublicCommentaryRepository();
  }

  async getCommentaryByMatch(matchId, page, limit) {
    ensureId(matchId);
    const pag = pagination(page, limit);
    return await this.repository.findByMatch(matchId, pag.page, pag.limit);
  }
}
