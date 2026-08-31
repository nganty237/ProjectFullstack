/**
 * @file validate.ts
 * @description Middleware générique de validation des corps de requêtes via un schéma Zod.
 */

import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

type RequestLocation = 'body' | 'query' | 'params'
const validate = (schema: z.ZodType, location: RequestLocation = 'body') => (req: Request, res: Response, next: NextFunction): void => {
  const result = schema.safeParse(req[location])

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field:   issue.path.join('.'),
      message: issue.message,
    }))
    res.status(400).json({ message: 'Données invalides', errors })
    return
  }

  req[location] = result.data
  next()
}

export default validate
