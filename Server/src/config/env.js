import dotenv from 'dotenv'
import z from 'zod'
import appConstant from '../constant/app.constant.js'
dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number().default(appConstant.PORT),
    MONGO_URL: z.string().default(appConstant.MONGO_URL),
    NODE_ENV: z.string().default(appConstant.NODE_ENV),
    LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
    CORS_ORIGIN: z.string().default(appConstant.CORS_ORIGIN),
    RATELIMIT_WINDOWAS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWAS),
    RATELIMIT: z.coerce.number().default(appConstant.RATELIMIT),
})  
    
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    throw parsedEnv.error
}

export default parsedEnv.data
