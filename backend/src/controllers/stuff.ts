/**
 * @file stuff.ts
 * @description Contrôleur CRUD pour l'entité Thing (création, lecture, mise à jour, suppression).
 */

import { Request, Response } from 'express'
import fs from 'fs'
import { ThingBody } from '../types'
import prisma from '../prisma'
import { NotFoundError, ForbiddenError, BadRequestError } from '../errors/AppError'

export const createThing = async (req: Request, res: Response): Promise<void> => {
  // 1) Vérifier si un fichier est présent.
    if (!req.file) {
      throw new BadRequestError('No file uploaded')
    }
  // 2) Vérifier si l'objet 'thing' est présent.
    if(!req.body.thing){
      throw new BadRequestError('Thing object missing')
    }
    // 3) Parser l'objet 'thing'.
    const thingObject: ThingBody = JSON.parse(req.body.thing)

    // 4) Créer l'objet dans la base de données.
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
}

export const updateThing = async (req: Request, res: Response): Promise<void> => {
    const paramId = req.params.id as string
    const id = parseInt(paramId, 10)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      throw new NotFoundError('Objet introuvable')
    }

    if (thing.userId !== Number(req.auth!.userId)) {
      throw new ForbiddenError('Accès non autorisé')
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
}

export const deleteThing = async (req: Request, res: Response): Promise<void> => {
    const paramId = req.params.id as string
    const id = parseInt(paramId, 10)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      throw new NotFoundError('Objet introuvable')
    }

    if (thing.userId !== Number(req.auth!.userId)) {
      throw new ForbiddenError('Accès non autorisé')
    }

    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, async () => {
      await prisma.thing.delete({ where: { id } })
      res.status(200).json({ message: 'Objet supprimé avec succès' })
    })
}

export const getOneThing = async (req: Request, res: Response): Promise<void> => {
    const paramId = req.params.id as string
    const id = Number(paramId)
    const thing = await prisma.thing.findUnique({ where: { id } })

    if (!thing) {
      throw new NotFoundError('Objet introuvable')
    }

    res.status(200).json(thing)
}

export const getAllThings = async (_req: Request, res: Response): Promise<void> => {
    const things = await prisma.thing.findMany()
    if (!things){
      throw new NotFoundError('Objets introuvables')
    }
    res.status(200).json(things)
}