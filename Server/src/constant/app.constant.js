export default {
    PORT:3000,
    MONGO_URL:"mongodb://localhost:27017/test",
    LOGGER_LEVEL:"info",
    NODE_ENV:"development",
    RATELIMIT_WINDOWAS: 15 * 60 * 1000,
    RATELIMIT: 100,
}

export const app_config = {
    jwt: {
        accessToken: { expiresIn: "1H" },
        refreshToken: { expiresIn: "1D" } 
    },
    cookie: {
        accessToken: {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000 
        }, 
        refreshToken: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 
        }
    }
}