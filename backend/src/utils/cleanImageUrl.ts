/**
 * @file cleanImageUrl.ts
 * @description Utilitaires de nettoyage des URLs d'images des documents Mongoose.
 */

import { IThingDocument } from '../models/things'

const cleanImageUrl = (imageUrl: string): string => {
  return imageUrl.trim().replace(/^[\"']|[\"']$/g, '')
}

const cleanThingImageUrl = (thing: IThingDocument): any => {
  const cleaned = thing.toObject()
  cleaned.imageUrl = cleanImageUrl(cleaned.imageUrl as string)
  return cleaned
}

export { cleanImageUrl, cleanThingImageUrl }
