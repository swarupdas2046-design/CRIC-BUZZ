import CreateApp from "./app.js";
import env from './config/env.js'
import logger from './config/logger.js'
import connectDB from "./database/mongodb.js";


const app =   CreateApp()

function StartServer(){

connectDB().then(() => {

    app.listen(env.PORT, () => {
        logger.info({port: env.PORT},"Server is running suuccessfully")
    })

}).catch((error) => {
    logger.error({error:error},"Error while running server")
})

}

StartServer()