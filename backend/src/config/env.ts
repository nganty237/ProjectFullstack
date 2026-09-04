/**
 * @file env.ts
 * @description configuration de l'envrironnement 
 */

import dotenv from 'dotenv'
import {z} from 'zod'

dotenv.config()

const envSchema = z.object({
    MODE_ENV: z
        .enum(['developpement', 'production', 'test'])
        .default('developpement'),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(3000),
    
    DATABASE_URL:z
        .string({message:"DATABASE_URL est requis"})
        .min(1, 'DATABASE_URL ne peut pas etre vide'),
    
    JWT_SECRET:z
        .string({message: 'JWT_SECRET est requis pour securiser les tokens'})
        .min(16, 'JWT_SECRET doit contenir au moins 16 caracteres'),
    JWT_EXPIRES_IN: z
        .string()
        .default('24h')    
})

const paredEnv = envSchema.safeParse(process.env)

if(!paredEnv.success){
    console.error("Erreur de configuration", paredEnv.error)

    paredEnv.error.issues.forEach((issue) => {
        console.error(`- Variable [${issue.path.join('.')}] : ${issue.message}`)
    })
    process.exit(1) 
}

export const config = Object.freeze(paredEnv.data)

export type Config = z.infer<typeof envSchema>
