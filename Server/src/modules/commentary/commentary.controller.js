import CommentaryService from "./commentary.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class CommentaryController {
  constructor() {
    this.commentaryService = new CommentaryService();
  }

  async addCommentary(req, res) {
    const userId = req.user?.id || req.user?._id;
    const commentary = await this.commentaryService.addCommentary(
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Commentary created", 201, commentary);
  }

  async deleteCommentary(req, res) {
    const commentary = await this.commentaryService.deleteCommentary(
      req.params.id,
    );
    buildSuccessResponse(res, "Commentary deleted", 200, commentary);
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
