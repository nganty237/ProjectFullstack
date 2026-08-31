/**
 * @file thingSchema.ts
 * @description Schemas de validation Zod pour l'entite Thing et les parametres d'URL
 */
import {z} from 'zod'

// validation de l'ID passe dans l'URL 
export const thingIdParamSchema = z.object({
    id:z.coerce
    .number({message:'L\'ID doit etre un nombre'})
    .int({message:'L\'ID doit etre un entier'})
    .positive({message:'L\'ID doit etre superieur a 0'})
})

//validation pour la creation d'objet (POST)

export const creatThingSchema = z.object({
    title: z
    .string({message:'le titre est requis'})
    .trim()
    .min(6, "le titre doit contenir au moins 6 caracteres")
    .max(100, "le titre doit contenir au plus 100 caracteres"),

    description: z
    .string({message:'La description est requise'})
    .trim()
    .min(3, "la description doit contenir au moins 3 caracteres")
    .max(1000,"la description doit contenir au plus 1000 caracteres"),

    price: z
    .coerce
    .number({message:'Le prix doit etre un nombre'})
    .positive({message:'le prix doit etre strictemet suprerieur a 0'})
})

// validation pour la mise a jour 
export const updateThingSchema = creatThingSchema.partial()

//extraction automatique des types TypeScript (Single Source of Truth)
export type ThingBody = z.infer<typeof creatThingSchema>
export type ThingParams = z.infer<typeof thingIdParamSchema>
export type ThingInput = z.infer<typeof updateThingSchema> 