import HomeService from "./service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class HomeController {
  constructor() {
    this.homeService = new HomeService();
  }

  async getHome(req, res) {
    const data = await this.homeService.getHome();
    buildSuccessResponse(res, "Home data fetched", 200, data);
  }
}
