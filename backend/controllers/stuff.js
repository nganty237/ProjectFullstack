const Thing = require('../models/things')
const { cleanImageUrl, cleanThingImageUrl } = require('../utils/cleanImageUrl')

exports.createThing = (req, res, next) => {
delete req.body._id
req.body.imageUrl = cleanImageUrl(req.body.imageUrl)
const thing = new Thing({
    ...req.body
})
thing.save()
.then(() => res.status(201).json({message:"donnees post ees avec succes "}))
.catch((err) => res.status(400).json({error: err}))
}

exports.updateThing = (req, res, next) => {
    Thing.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(() => res.status(200).json({message:"donnees modifiees avec succes"}))
    .catch((err) => res.status(400).json({error:err}))
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