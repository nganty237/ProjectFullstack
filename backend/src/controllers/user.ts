/**
 * @file user.ts
 * @description Contrôleur pour l'authentification : inscription et connexion des utilisateurs.
 */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'
import { UnauthorizedError } from '../errors/AppError'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const hash = await bcrypt.hash(req.body.password, 10)
  await prisma.user.create({ 
    data: { email: req.body.email, password: hash } 
  })
  res.status(201).json({ message: 'Utilisateur créé avec succès' })
}

export const signin = async (req: Request, res: Response): Promise<void> => {
    const user = await prisma.user.findUnique({where: { email: req.body.email }})

    if (!user) {
      throw new UnauthorizedError('Paire identifiant / mot de passe incorrecte')
    }

    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) {
      throw new UnauthorizedError('Paire identifiant / mot de passe incorrecte')
    }

    const secret = process.env.JWT_SECRET as string
    res.status(200).json({
      userId: user.id,
      token: jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' }),
    })
}
