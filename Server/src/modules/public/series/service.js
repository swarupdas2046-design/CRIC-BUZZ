import PublicSeriesRepository from "./repository.js";
import AppError from "../../../shared/error/app.error.js";
import { ensureId } from "../shared/query.js";

export default class PublicSeriesService {
  constructor() {
    this.repository = new PublicSeriesRepository();
  }

  async getAllSeries() {
    return await this.repository.findAll();
  }

  async getSeriesById(id) {
    ensureId(id);
    const series = await this.repository.findById(id);
    if (!series) {
      throw new AppError("Series not found", 404);
    }
    return series;
  }

  async getSeriesWithMatches(id) {
    ensureId(id);
    const series = await this.repository.findById(id);
    if (!series) {
      throw new AppError("Series not found", 404);
    }

    const matches = await this.repository.findMatchesBySeries(id);
    const pointsTable = await this.getPointsTable(id);

    return { series, matches, pointsTable };
  }

  async getSeriesMatches(id) {
    ensureId(id);
    const series = await this.repository.findById(id);
    if (!series) {
      throw new AppError("Series not found", 404);
    }
    return await this.repository.findMatchesBySeries(id);
  }

  async getPointsTable(seriesId) {
    const matches =
      await this.repository.findCompletedMatchesBySeries(seriesId);
    const teamStats = {};

    matches.forEach((match) => {
      const [team1, team2] = match.teams || [];

      if (team1) {
        const teamId = team1._id.toString();
        if (!teamStats[teamId]) {
          teamStats[teamId] = {
            team: team1,
            played: 0,
            won: 0,
            lost: 0,
            points: 0,
          };
        }
        teamStats[teamId].played += 1;

        if (match.winner?.toString() === teamId) {
          teamStats[teamId].won += 1;
          teamStats[teamId].points += 2;
        } else if (match.winner) {
          teamStats[teamId].lost += 1;
        }
      }

      if (team2) {
        const teamId = team2._id.toString();
        if (!teamStats[teamId]) {
          teamStats[teamId] = {
            team: team2,
            played: 0,
            won: 0,
            lost: 0,
            points: 0,
          };
        }
        teamStats[teamId].played += 1;

        if (match.winner?.toString() === teamId) {
          teamStats[teamId].won += 1;
          teamStats[teamId].points += 2;
        } else if (match.winner) {
          teamStats[teamId].lost += 1;
        }
      }
    });

    const table = Object.values(teamStats).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.won - a.won;
    });

    return table;
  }
}
