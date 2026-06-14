import SeriesService from "./series.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class SeriesController {
  constructor() {
    this.seriesService = new SeriesService();
  }

  async createSeries(req, res) {
    const userId = req.user?.id || req.user?._id;
    const created = await this.seriesService.createSeries(
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Series created", 201, created);
  }

  async getSeries(req, res) {
    const list = await this.seriesService.getSeries();
    buildSuccessResponse(res, "Series fetched", 200, list);
  }

  async getSeriesById(req, res) {
    const item = await this.seriesService.getSeriesById(req.params.id);
    buildSuccessResponse(res, "Series fetched", 200, item);
  }

  async updateSeries(req, res) {
    const userId = req.user?.id || req.user?._id;
    const updated = await this.seriesService.updateSeries(
      req.params.id,
      req.validated,
      userId,
    );
    buildSuccessResponse(res, "Series updated", 200, updated);
  }

  async deleteSeries(req, res) {
    const userId = req.user?.id || req.user?._id;
    const deleted = await this.seriesService.deleteSeries(
      req.params.id,
      userId,
    );
    buildSuccessResponse(res, "Series deleted", 200, deleted);
  }
}
