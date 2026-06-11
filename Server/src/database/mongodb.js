import mongoose from 'mongoose'
import env from '../config/env.js'
import logger from '../config/logger.js'


const connectDB = async () => {
  
        await mongoose.connect(env.MONGO_URL)
    logger.info('MONGO DB CONNECTED SUCCESSFULLY')
}

export default connectDB