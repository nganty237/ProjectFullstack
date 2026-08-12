/**
 * @file things.ts
 * @description Modèle Mongoose pour l'entité Thing avec typage TypeScript.
 */

import mongoose, { Schema, Document } from 'mongoose'
import { IThing } from '../types'

export interface IThingDocument extends Omit<IThing, '_id'>, Document {}

const thingSchema = new Schema<IThingDocument>({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  imageUrl:    { type: String, required: true },
  userId:      { type: String, required: true },
  price:       { type: Number, required: true },
})

export default mongoose.model<IThingDocument>('Thing', thingSchema)
