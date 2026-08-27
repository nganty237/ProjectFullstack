/**
 * @file user.ts
 * @description Contrôleur pour l'authentification : inscription et connexion des utilisateurs.
 */

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    await prisma.user.create({ data: { email: req.body.email, password: hash } })
    res.status(201).json({ message: 'Utilisateur créé avec succès' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({where: { email: req.body.email }})

    if (!user) {
      res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte' })
      return
    }

    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) {
      res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte' })
      return
    }

    const secret = process.env.JWT_SECRET as string
    res.status(200).json({
      userId: user.id,
      token: jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' }),
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
