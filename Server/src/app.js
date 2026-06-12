import express from 'express'
import env from './config/env.js'
import morgan from 'morgan'
import securityMiddleware from './middleware/security.middleware.js'
import googleAuthMiddleware from './middleware/googleOAuth.middleware.js'

let CreateApp = () => {
    let app = express()
    
    if (env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
        
    }

    securityMiddleware(app)
    googleAuthMiddleware(app)
    
    return app
}

export default CreateApp   
