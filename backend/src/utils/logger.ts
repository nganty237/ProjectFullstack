/**
 * @file logger.ts 
 * @description logger pour les messages de log
 */

import pino from 'pino'
import {config} from '../config/env'


const isDev = config.MODE_ENV === 'developpement'

export const logger = pino({
    level: isDev ? 'debug' : 'info',
    transport: isDev ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:HH:mm:ss',
            ignore: 'pid,hostname'
        }
    } : undefined,

    timestamp: pino.stdTimeFunctions.isoTime, 
})
export default logger