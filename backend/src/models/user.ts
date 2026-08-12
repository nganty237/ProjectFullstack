/**
 * @file user.ts
 * @description Modèle Mongoose pour l'entité User avec typage TypeScript et validation d'unicité.
 */

import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { IUser } from '../types'

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<IUserDocument>({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

export default mongoose.model<IUserDocument>('User', userSchema)
