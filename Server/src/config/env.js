import dotenv from 'dotenv'
import z from 'zod'
import appConstant from '../constant/app.constant.js'
dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number().default(appConstant.PORT),
    MONGO_URL: z.string().default(appConstant.MONGO_URL),
    Node_ENV: z.string().default(appConstant.NODE_ENV),
    LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
    JWT_SECRET_ACCESS: z.string().min(1, "JWT_SECRET_ACCESS is required"),
    JWT_SECRET_REFRESH: z.string().min(1, "JWT_SECRET_REFRESH is required"),
})  
    
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    console.error(parsedEnv.error)
    // process.exit(1)
}

export default parsedEnv.data
