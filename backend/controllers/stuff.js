const Thing = require('../models/things')
const { cleanImageUrl, cleanThingImageUrl } = require('../utils/cleanImageUrl')
 const fs = require('fs')
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
            res.status(400).json({ error: err.message || err });
        });
};

exports.updateThing = (req, res, next) => {
    const thingObject = req.file ? { ...JSON.parse(req.body.thing), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } : { ...req.body }
    delete thingObject.userId;
    Thing.findOne({_id:req.params.id})
    .then((thing) => {
        if(thing.userId != req.auth.userId){
            res.status(401).json({message:"acces non autorise"})
        }else{
            Thing.updateOne({_id:req.params.id}, {...thingObject, _id:req.params.id})
            .then(() => res.status(200).json({message:'objet modifie avec succes'}))
            .catch((error) => res.status(400).json(error))
        }
    })
    .catch(err => res.status(400).json(err))

} 

exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id:req.params.id})
    .then(thing => {
        if(thing.userId != req.auth.userId){
            res.status(400).json({message:"erreur de suppression"})
        }else{
            const filename = thing.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id:req.params.id})
                .then(() => res.status(200).json({message: 'objet supprimé avec succes'}))
                .catch(err => res.status(400).json({err}))
            })
        }
    })
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