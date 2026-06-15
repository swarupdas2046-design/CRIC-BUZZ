import PublicSeriesService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PublicSeriesController {
  constructor() {
    this.seriesService = new PublicSeriesService();
  }

  async getAllSeries(req, res) {
    const series = await this.seriesService.getAllSeries();
    buildSuccessResponse(res, "Series fetched", 200, series);
  }

  async getSeriesById(req, res) {
    const series = await this.seriesService.getSeriesById(req.params.id);
    buildSuccessResponse(res, "Series fetched", 200, series);
  }

  async getSeriesWithMatches(req, res) {
    const data = await this.seriesService.getSeriesWithMatches(req.params.id);
    buildSuccessResponse(res, "Series data fetched", 200, data);
  }

  async getSeriesMatches(req, res) {
    const matches = await this.seriesService.getSeriesMatches(req.params.id);
    buildSuccessResponse(res, "Series matches fetched", 200, matches);
  }

  async getPointsTable(req, res) {
    const table = await this.seriesService.getPointsTable(req.params.id);
    buildSuccessResponse(res, "Points table fetched", 200, table);
  }
}
