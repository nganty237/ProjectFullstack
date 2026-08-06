

/**
 *nettoie une URL d'image (supprime les espaces et les guillemets inutiles).
 Elle ne modifie ni la casse ni la base de données à elle seule.
*/
const cleanImageUrl = (imageUrl) => {
    if (typeof imageUrl !== 'string') {
        return imageUrl
    }
    return imageUrl.trim().replace(/^["']|["']$/g, '')
}

/**
 * s'assure que le document est manipulé comme un objet JavaScript simple (si nécessaire), 
 * nettoie la propriété imageUrl, puis renvoie l'objet.
*/
const cleanThingImageUrl = (thing) => {
    if (!thing) {
        return thing
    }
    const cleanedThing = thing.toObject ? thing.toObject() : thing
    cleanedThing.imageUrl = cleanImageUrl(cleanedThing.imageUrl)
    return cleanedThing
}

module.exports = {cleanImageUrl, cleanThingImageUrl}