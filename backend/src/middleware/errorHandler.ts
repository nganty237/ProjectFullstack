/**
 * @file errorHandler.ts
 * @description Gestionnaire d'erreurs centralisé pour l'application Express.
 */

import { Request, Response, NextFunction } from "express";
import {AppError} from "../errors/AppError"
import { Prisma } from "@prisma/client";
import {logger} from "../utils/logger"

// Gestionnaire d'erreurs centralisé
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction):void =>{

    // Erreurs personnalisées de l'application (AppError)
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            status: err.statusCode >= 400 && err.statusCode < 500 ? 'fail' : 'error',
            message: err.message
        })
        return
    }

    // Erreurs de base de données (Prisma)
    if (err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2002'){
            res.status(409).json({
                status: 'fail',
                message: 'cette email existe deja'
            })
        }
        return
    }

    // Erreur de base de données (Prisma) - Enregistrement non trouvé
    if (err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2025'){
            res.status(404).json({
                status: 'fail',
                message: 'Enregistrement non trouvé'
            })
            return
        }
    }
    
    // Erreur serveur non gérée
    logger.error({err}, 'erreur inattendue capturée par le errorHandler')
    res.status(500).json({
        status: 'error',
        message: 'Une erreur interne est survenue sur le serveur'
    })
}