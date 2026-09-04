/**
 * @file notFoundHandler.ts
 * @description Middleware interceptant les routes appelées qui n'existent pas.
 */

import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../errors/AppError'

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError(`La route ${req.method} ${req.originalUrl} n'existe pas sur ce serveur`))
}

export default notFoundHandler