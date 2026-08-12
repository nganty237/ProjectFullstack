/**
 * @file validate.ts
 * @description Middleware générique de validation des corps de requêtes via un schéma Zod.
 */

import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req.body)

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field:   issue.path.join('.'),
      message: issue.message,
    }))
    res.status(400).json({ message: 'Données invalides', errors })
    return
  }

  req.body = result.data
  next()
}

export default validate
