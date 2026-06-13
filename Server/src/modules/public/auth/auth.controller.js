import AuthService from "./auth.service.js";
import env from "../../../config/env.js"
import { app_config } from "../../../constant/app.constant.js";

export default class AuthController {
  constructor() {
    this.userService = new AuthService();
  }


  async GoogleCallback(req, res) {

      const { accessToken, refreshToken } = await this.userService.CreateUser(req.user);

      res.cookie("refreshToken", refreshToken, app_config.cookie.refreshToken);

      res.cookie("accessToken", accessToken, app_config.cookie.accessToken);

      res.redirect(env.REDIRECT_URL);
  }

}