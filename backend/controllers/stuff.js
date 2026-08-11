const Thing = require('../models/things')
const { cleanImageUrl, cleanThingImageUrl } = require('../utils/cleanImageUrl')
 
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject.userId;
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: "donnees postees avec succes " }))
        .catch((err) => {
            console.log("Erreur d'enregistrement MongoDB :", err); // Affiche l'erreur exacte dans le terminal
            res.status(400).json({ error: err.message || err });
        });
};

exports.updateThing = (req, res, next) => {
    const thingObject = req.file ? { ...JSON.parse(req.body.thing), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } : { ...req.body }
    delete thingObject.userId;

}

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({message:"article supprime avec succes"}))
    .catch((err) => res.status(400).json({error: err}))
}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id:req.params.id})
        .then((thing) => res.status(200).json(cleanThingImageUrl(thing)))
        .catch((error) => res.status(404).json(error))
}

exports.getAllThings =(req, res, next) =>{
    Thing.find()
        .then((things) => res.status(200).json(things.map(cleanThingImageUrl)))
        .catch((error) => res.status(400).json(error))
} 