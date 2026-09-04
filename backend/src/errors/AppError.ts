/**
 * @file AppError.ts
 * @description Classe d'erreur personnalisée pour les erreurs applicatives.
 */

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational:boolean;

    constructor(message: string, statusCode:number = 500){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequestError extends AppError{
    constructor(message:string = 'Requete invalide'){
        super(message, 400)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Non authentifie'){
        super(message, 401)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Acces refusé'){
        super(message, 403)
    }
}

export class NotFoundError extends AppError{
    constructor(message: string = 'Ressource non trouve'){
        super(message, 404)
    }
}

export class ConflictError extends AppError{
    constructor(message: string = 'Ressource deja existante'){
        super(message,409)
    }
}
