import MatchModel from "../match/match.model.js";
import CommentaryRepository from "./commentary.repository.js";
import { BadRequestError, NotFound } from "../../shared/error/app.error.js";
import { isValidObjectId } from "mongoose";
import { getSocket } from "../../shared/utils/socket.js";

const LIVE_STATUS = "LIVE";

export default class CommentaryService {
  constructor() {
    this.commentaryRepository = new CommentaryRepository();
  }

  async ensureLiveMatch(matchId) {
    if (!isValidObjectId(matchId)) {
      throw new BadRequestError("Invalid match id", 400);
    }

    const match = await MatchModel.findOne({ _id: matchId, isDeleted: false });
    if (!match) {
      throw new NotFound("Match not found", 404);
    }

    if (match.status !== LIVE_STATUS) {
      throw new BadRequestError("Match is not live", 400);
    }

    return match;
  }

  async addCommentary(payload, userId) {
    await this.ensureLiveMatch(payload.matchId);

    const commentary = await this.commentaryRepository.create({
      ...payload,
      createdBy: userId,
      updatedBy: userId,
    });

    const socket = getSocket();
    if (socket) {
      socket.emit("commentary.created", {
        matchId: commentary.matchId.toString(),
        over: commentary.over,
        ball: commentary.ball,
        text: commentary.text,
        type: commentary.type,
      });
    }

    return commentary;
  }

  async deleteCommentary(id) {
    const commentary = await this.commentaryRepository.findById(id);
    if (!commentary) {
      throw new BadRequestError("Commentary not found", 404);
    }

    return await this.commentaryRepository.deleteById(id);
  }

  async getCommentaryByMatch(matchId, page, limit) {
    await this.ensureLiveMatch(matchId);
    return await this.commentaryRepository.findByMatch(matchId, page, limit);
  }
}
