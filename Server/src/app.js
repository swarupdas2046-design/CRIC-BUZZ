import express from 'express'
import env from './config/env.js'
import morgan from 'morgan'
import router from './routes/auth.route.js'

let CreateApp = () => {
    let app = express()
    
    if (env.Node_ENV === 'development') {
        app.use(morgan('dev'))
        
    }
    app.use(express.json())
    app.use("/api/auth",router)

    return app
}

export default CreateApp   