/**
 * @file userSchema.ts
 * @description Schémas de validation Zod pour les routes d'authentification.
 */

import { z } from 'zod'

export const signupSchema = z.object({
  email:    z.email('Email invalide'),
  password: z.string({ message: 'Le mot de passe est requis' })
             .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export const signinSchema = z.object({
  email:    z.email('Email invalide'),
  password: z.string({ message: 'Le mot de passe est requis' })
             .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
