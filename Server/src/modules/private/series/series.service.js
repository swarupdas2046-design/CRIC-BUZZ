import SeriesRepository from "./series.repository.js";
import MatchRepository from "../match/match.repository.js";
import NotFound from "../../shared/error/notFound.error.js";
import ConflictError from "../../shared/error/conflict.error.js";

export default class SeriesService {
  constructor() {
    this.seriesRepo = new SeriesRepository();
    this.matchRepo = new MatchRepository();
  }

  async createSeries(data, userId) {
    // unique checks
    const existsName = await this.seriesRepo.findByName(data.name);
    if (existsName) {
      throw new ConflictError("Series name must be unique");
    }

    const existsSeason = await this.seriesRepo.findBySeason(data.season);
    if (existsSeason) {
      throw new ConflictError("Series season must be unique");
    }

    const payload = { ...data, createdBy: userId, updatedBy: userId };

    return await this.seriesRepo.create(payload);
  }

  async getSeries() {
    return await this.seriesRepo.findAll();
  }

  async getSeriesById(id) {
    const series = await this.seriesRepo.findById(id);
    if (!series) {
      throw new NotFound("Series not found");
    }

    return series;
  }

  async updateSeries(id, data, userId) {
    // prevent duplicate name/season if provided
    if (data.name) {
      const existing = await this.seriesRepo.findByName(data.name);
      if (existing && existing._id.toString() !== id.toString()) {
        throw new ConflictError("Series name must be unique");
      }
    }

    if (data.season) {
      const existing = await this.seriesRepo.findBySeason(data.season);
      if (existing && existing._id.toString() !== id.toString()) {
        throw new ConflictError("Series season must be unique");
      }
    }

    const payload = { ...data, updatedBy: userId };

    const updated = await this.seriesRepo.updateById(id, payload);
    if (!updated) {
      throw new NotFound("Series not found");
    }

    return updated;
  }

  async deleteSeries(id, userId) {
    // check matches
    const hasMatches = await this.matchRepo.existsBySeries(id);
    if (hasMatches) {
      throw new ConflictError("Cannot delete series because matches exist");
    }

    const deleted = await this.seriesRepo.softDelete(id, userId);
    if (!deleted) {
      throw new NotFound("Series not found");
    }

    return deleted;
  }
}
