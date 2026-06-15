import express from 'express'
import env from './config/env.js'
import morgan from 'morgan'
import securityMiddleware from './middleware/security.middleware.js'
import googleAuthMiddleware from './middleware/googleOAuth.middleware.js'
import authRouter from "./modules/public/auth/auth.route.js"
import ErrorHandler from './middleware/errorHandler.middleware.js'
import NotFound from './middleware/notFound.middleware.js'
import usersRouter from "./modules/users/user.route.js"
import seriesRouter from './modules/series/series.route.js'
import matchRouter from "./modules/match/match.route.js";
import publicApiRouter from "./modules/public/index.js";
import teamRouter from './modules/team/team.route.js';
import playerRouter from './modules/player/player.route.js'
import scoreRouter from "./modules/score/score.route.js"


let CreateApp = () => {
    let app = express()
    
    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
        
    }

    securityMiddleware(app)
    googleAuthMiddleware(app)

    app.use("/api/auth", authRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/series", seriesRouter);
    app.use("/api/matches", matchRouter);
    app.use("/api/teams", teamRouter);
    app.use("/api/public", publicApiRouter);
    app.use("/api/players", playerRouter);
    app.use("/api/scores", scoreRouter);
    app.use(NotFound)
    app.use(ErrorHandler)
    
    return app
}

export default CreateApp   
