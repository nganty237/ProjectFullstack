/**
 * @file stuff.ts
 * @description Contrôleur CRUD pour l'entité Thing (création, lecture, mise à jour, suppression).
 */

import { Request, Response } from 'express'
import fs from 'fs'
import Thing from '../models/things'
import { ThingBody } from '../types'
import { cleanThingImageUrl } from '../utils/cleanImageUrl'

export const createThing = async (req: Request<{}, {}, { thing: string }>, res: Response): Promise<void> => {
  try {
    const thingObject: ThingBody = JSON.parse(req.body.thing)
    delete thingObject._id
    delete thingObject.userId

    const thing = new Thing({
      ...thingObject,
      userId:   req.auth!.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file!.filename}`,
    })

    await thing.save()
    res.status(201).json({ message: 'Objet créé avec succès' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const updateThing = async (req: Request<{ id: string }, {}, ThingBody>, res: Response): Promise<void> => {
  try {
    const thingObject: ThingBody = req.file
      ? { ...JSON.parse((req.body as unknown as { thing: string }).thing), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
      : { ...req.body }

    delete thingObject.userId

    const thing = await Thing.findOne({ _id: req.params.id })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    if (thing.userId !== req.auth!.userId) {
      res.status(401).json({ message: 'Accès non autorisé' })
      return
    }

    await Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    res.status(200).json({ message: 'Objet modifié avec succès' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const deleteThing = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    if (thing.userId !== req.auth!.userId) {
      res.status(401).json({ message: 'Accès non autorisé' })
      return
    }

    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, async () => {
      await Thing.deleteOne({ _id: req.params.id })
      res.status(200).json({ message: 'Objet supprimé avec succès' })
    })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const getOneThing = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const thing = await Thing.findOne({ _id: req.params.id })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    res.status(200).json(cleanThingImageUrl(thing))
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

export const getAllThings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const things = await Thing.find()
    res.status(200).json(things.map(cleanThingImageUrl))
  } catch (err) {
    res.status(400).json({ error: err })
  }
}
