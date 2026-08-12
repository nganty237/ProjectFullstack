/**
 * @file app.ts
 * @description Configuration de l'application Express : middlewares globaux, connexion MongoDB et routes.
 */

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'

import userRoutes from './routes/user'
import stuffRoutes from './routes/stuff'

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connexion établie à MongoDB'))
  .catch((err) => console.error('Connexion MongoDB échouée :', err))

app.use('/api/auth', userRoutes)
app.use('/api/stuff', stuffRoutes)
app.use('/images', express.static(path.join(__dirname, '../images')))

export default app
