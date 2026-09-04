/**
 * @file httpLogger.ts
 * @description Middleware d'interception et de journalisation des requêtes HTTP.
 */

import { Request, Response, NextFunction } from "express";
import {logger} from "../utils/logger"
import crypto from 'crypto'

export const httpLogger = (req: Request, res: Response, next: NextFunction):void=>{
    const start = Date.now()

    //recuperation ou creation d'un identifiant unique de correlation
    const reqId = req.headers['x-request-id'] as string || crypto.randomUUID()
    res.setHeader('x-request-id', reqId)

    // ecoute l'evenement finish quand la reponse est entierement envoye
    res.on('finish' , () => {
        const duration = Date.now() - start
        const statusCode = res.statusCode

        const logData = {
            reqId,
            method: req.method,
            url: req.originalUrl,
            status: statusCode,
            durationMs: duration,
            ip: req.ip,
        }

        const message = `${req.method} ${req.originalUrl} - ${statusCode} - (${duration}ms)`

        if(statusCode >= 500){
            logger.error(logData, message)

        }else if(statusCode >= 400){
            logger.warn(logData, message)
        }else {
            logger.info(logData,message)
        }
    })
    next()
}

export default httpLogger