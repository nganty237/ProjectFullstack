/**
 * @file stuff.ts
 * @description Contrôleur CRUD pour l'entité Thing (création, lecture, mise à jour, suppression).
 */

import { Request, Response } from 'express'
import fs from 'fs'
import { ThingBody } from '../types'
import prisma from '../prisma'

export const createThing = async (req: Request, res: Response): Promise<void> => {
  try {
    const thingObject: ThingBody = JSON.parse(req.body.thing)

    await prisma.thing.create({
      data: {
        title: thingObject.title as string,
        description: thingObject.description as string,
        price: Number(thingObject.price),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file!.filename}`,
        userId: Number(req.auth!.userId),
      },
    })

    res.status(201).json({ message: 'Objet créé avec succès' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const updateThing = async (req: Request, res: Response): Promise<void> => {
  try {
    const paramId = req.params.id as string
    const id = parseInt(paramId, 10)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    if (thing.userId !== Number(req.auth!.userId)) {
      res.status(401).json({ message: 'Accès non autorisé' })
      return
    }

    const thingObject: ThingBody = req.file
      ? { ...JSON.parse(req.body.thing), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
      : { ...req.body }

    await prisma.thing.update({
      where: { id },
      data: {
        title: thingObject.title,
        description: thingObject.description,
        price: thingObject.price ? Number(thingObject.price) : undefined,
        imageUrl: thingObject.imageUrl,
      },
    })

    res.status(200).json({ message: 'Objet modifié avec succès' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const deleteThing = async (req: Request, res: Response): Promise<void> => {
  try {
    const paramId = req.params.id as string
    const id = parseInt(paramId, 10)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    if (thing.userId !== Number(req.auth!.userId)) {
      res.status(401).json({ message: 'Accès non autorisé' })
      return
    }

    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, async () => {
      await prisma.thing.delete({ where: { id } })
      res.status(200).json({ message: 'Objet supprimé avec succès' })
    })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const getOneThing = async (req: Request, res: Response): Promise<void> => {
  try {
    const paramId = req.params.id as string
    const id = Number(paramId)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      res.status(404).json({ message: 'Objet introuvable' })
      return
    }

    res.status(200).json(thing)
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

export const getAllThings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const things = await prisma.thing.findMany()
    res.status(200).json(things)
  } catch (err) {
    res.status(400).json({ error: err })
  }
}