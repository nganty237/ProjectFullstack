/**
 * @file app.ts
 * @description Configuration de l'application Express : middlewares globaux, connexion MongoDB et routes.
 */

import express from 'express'
import cors from 'cors'
import path from 'path'
import 'dotenv/config'
import prisma from './prisma'

import userRoutes from './routes/user'
import stuffRoutes from './routes/stuff'

prisma.$connect().then(() => console.log('connect to postgresql'))
.catch(() => console.log('cannot connect to postgresql'))

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/stuff', stuffRoutes)
app.use('/images', express.static(path.join(__dirname, '../images')))

export default app
