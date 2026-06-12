import express from 'express'
import env from './config/env.js'
import morgan from 'morgan'

let CreateApp = () => {
    let app = express()
    
    if (env.Node_ENV === 'development') {
        app.use(morgan('dev'))
        
    }
    app.use(express.json())

    return app
}

export default CreateApp   