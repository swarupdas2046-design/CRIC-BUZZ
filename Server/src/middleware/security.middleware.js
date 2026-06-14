import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import compression from "compression"
import rateLimit from "express-rate-limit"
import cors from "cors"
import env from "../config/env.js"
import CookieParser from "cookie-parser";

export default function securityMiddleware(app) {
    app.use(helmet())
    app.use(hpp())
    app.use(compression())
    app.use(CookieParser());
    app.use(express.json({limit: "5mb"}))
    app.use(express.urlencoded({extended:true, limit: "5mb"}))
    // ek particular ip se 15 min 100 req allow hoo
    app.use(rateLimit({
        windowMs: env.RATELIMIT_WINDOWAS,
        limit: env.RATELIMIT,
        legacyHeaders: true,
        message: "too many request try again after few minutes"
    }))
    app.use(cors({
        origin: env.CORS_ORIGIN.split(",").map((origin)=> origin.trim()),
        credentials:true
    }))
}