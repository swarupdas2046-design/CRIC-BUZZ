import express from 'express'
import env from './config/env.js'
import morgan from 'morgan'
import securityMiddleware from './middleware/security.middleware.js'
import googleAuthMiddleware from './middleware/googleOAuth.middleware.js'
import authRouter from "./modules/public/auth/auth.route.js"
import ErrorHandler from './middleware/errorHandler.middleware.js'
import NotFound from './middleware/notFound.middleware.js'

let CreateApp = () => {
    let app = express()
    
    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
        
    }

    securityMiddleware(app)
    googleAuthMiddleware(app)

    app.use("/api/auth", authRouter);
    app.use(NotFound)
    app.use(ErrorHandler)
    
    return app
}

export default CreateApp   
