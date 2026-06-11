import env from './env.js'
import pino from 'pino'
const logger = pino({
    level: env.LOGGER_LEVEL,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

export default logger
