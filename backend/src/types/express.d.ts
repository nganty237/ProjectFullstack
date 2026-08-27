/**
 * @file express.d.ts
 * @description Augmentation du type Request d'Express pour inclure req.auth injecté par le middleware JWT.
 */

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: number
      }
    }
  }
}

export {}
