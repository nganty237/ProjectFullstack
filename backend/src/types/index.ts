/**
 * @file index.ts
 * @description Interfaces TypeScript partagées dans tout le projet (entités métier, corps de requêtes, JWT).
 */

export interface IThing {
  title: string
  description: string
  imageUrl: string
  userId: string
  price: number
}

export interface IUser {
  email: string
  password: string
}

export interface SignupBody {
  email: string
  password: string
}

export interface SigninBody {
  email: string
  password: string
}

export interface ThingBody {
  _id?: string
  title?: string
  description?: string
  imageUrl?: string
  userId?: string
  price?: number
}

export interface JwtPayload {
  userId: string
}
