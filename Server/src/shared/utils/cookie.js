import { app_config } from "../../constant/app.constant.js";

export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie( "accessToken", accessToken, app_config.cookie.accessToken );
    res.cookie( "refreshToken", refreshToken, app_config.cookie.refreshToken);
};

export const clearAuthCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};