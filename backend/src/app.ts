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
import notFoundHandler from './middleware/notFoundHandler'
import { errorHandler } from './middleware/errorHandler'
import httpLogger from './middleware/httpLogger'
import {logger} from './utils/logger'

prisma.$connect().then(() => logger.info('connect to postgresql'))
.catch(() => logger.fatal('cannot connect to postgresql'))

const app = express()
app.use(httpLogger)
app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/stuff', stuffRoutes)
app.use('/images', express.static(path.join(__dirname, '../images')))

// Middleware pour les routes non trouvées
app.use(notFoundHandler)

// Middleware pour la gestion des erreurs
app.use(errorHandler)

export default app
