import AuthService from "./auth.service.js";
import env from "../../../config/env.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import { clearAuthCookies, setAuthCookies } from "../../../shared/utils/cookie.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }


  async GoogleCallback(req, res) {
    const { accessToken, refreshToken } = await this.authService.CreateUser(
      req.user,
    );
    setAuthCookies( res, accessToken, refreshToken);
    res.redirect(env.REDIRECT_URL);
  }

  async register(req, res) {
    const result = await this.authService.register( req.body);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return buildSuccessResponse( res, "User Created successfully", 201, result.user);
  }

  async login(req, res) {
    const result = await this.authService.login(req.body);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return buildSuccessResponse(res, "Login Successful", 200, result.user);
  }


}
