/**
 * @file cleanImageUrl.ts
 * @description Utilitaires de nettoyage des URLs d'images des objets Prisma.
 */

const cleanImageUrl = (imageUrl: string): string => {
  return imageUrl.trim().replace(/^[\"']|[\"']$/g, '')
}

const cleanThingImageUrl = <T extends { imageUrl: string }>(thing: T): T => {
  return {
    ...thing,
    imageUrl: cleanImageUrl(thing.imageUrl),
  }
}

export { cleanImageUrl, cleanThingImageUrl }

