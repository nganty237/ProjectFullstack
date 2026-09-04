/**
 * @file server.ts
 * @description Point d'entrée du serveur : démarrage sur le port défini dans les variables d'environnement.
 */

import 'dotenv/config'
import app from './app'
import { logger } from './utils/logger'
import {config} from './config/env'

const PORT = config.PORT

app.listen(PORT, () => {
  logger.info(`Server running on ${config.MODE_ENV} port ${PORT}`)
})
