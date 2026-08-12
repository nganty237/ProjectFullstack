/**
 * @file auth.ts
 * @description Middleware de vérification du token JWT sur les routes protégées.
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ error: 'Token manquant' })
      return
    }

    const secret = process.env.JWT_SECRET as string
    const decodedToken = jwt.verify(token, secret) as JwtPayload

    req.auth = { userId: decodedToken.userId }
    next()
  } catch {
    res.status(401).json({ error: 'Requête non autorisée' })
  }
}

export default auth
