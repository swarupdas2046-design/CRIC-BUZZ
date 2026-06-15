import PublicCommentaryService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicCommentaryController {
  constructor() {
    this.commentaryService = new PublicCommentaryService();
  }

  async getCommentaryByMatch(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const result = await this.commentaryService.getCommentaryByMatch(
      req.params.matchId,
      page,
      limit,
    );
    buildSuccessResponse(res, "Commentary fetched", 200, result);
  }
}
