import MatchModel from "../match/match.model.js";
import ScoreRepository from "./score.repository.js";
import { AppError, BadRequestError, NotFound } from "../../shared/error/app.error.js";
import { isValidObjectId } from "mongoose";
// import { getSocket } from "../../shared/utils/socket.js";

const LIVE_STATUS = "LIVE";

export default class ScoreService {
  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  async ensureLiveMatch(matchId) {
    if (!isValidObjectId(matchId)) {
      throw new BadRequestError("Invalid match id");
    }

    const match = await MatchModel.findOne({ _id: matchId, isDeleted: false });
    if (!match) {
      throw new NotFound("Match not found");
    }

    if (match.status !== LIVE_STATUS) {
      throw new BadRequestError("Match is not live");
    }

    return match;
  }

  async createScore(payload, userId) {
    const match = await this.ensureLiveMatch(payload.matchId);

    if (
      ![
        payload.battingTeam.toString(),
        match.teams[0]?.toString(),
        match.teams[1]?.toString(),
      ].includes(payload.battingTeam.toString())
    ) {
      throw new BadRequestError("Batting team must be either team1 or team2", 400);
    }

    const inningsExists = await this.scoreRepository.findByMatchAndInnings(
      payload.matchId,
      payload.innings,
    );

    if (inningsExists) {
      throw new AppError("Score for this innings already exists", 409);
    }

    if (payload.innings < 1 || payload.innings > 2) {
      throw new AppError("Invalid innings", 400);
    }

    const created = await this.scoreRepository.create({
      ...payload,
      createdBy: userId,
      updatedBy: userId,
    });

    const socket = getSocket();
    if (socket) {
      socket.emit("score.updated", {
        matchId: created.matchId.toString(),
        innings: created.innings,
        score: created.score,
        wickets: created.wickets,
        overs: created.overs,
        runRate: created.runRate,
        target: created.target,
      });
    }

    return created;
  }

  async updateScore(id, payload, userId) {
    const score = await this.scoreRepository.findById(id);
    if (!score) {
      throw new NotFound("Score not found", 404);
    }

    const match = await this.ensureLiveMatch(score.matchId);

    const updated = await this.scoreRepository.updateById(id, {
      ...payload,
      updatedBy: userId,
    });

    const socket = getSocket();
    if (socket) {
      socket.emit("score.updated", {
        matchId: updated.matchId.toString(),
        innings: updated.innings,
        score: updated.score,
        wickets: updated.wickets,
        overs: updated.overs,
        runRate: updated.runRate,
        target: updated.target,
      });
    }

    return updated;
  }

  async getScoresByMatch(matchId) {
    await this.ensureLiveMatch(matchId);
    return await this.scoreRepository.findByMatch(matchId);
  }
}
