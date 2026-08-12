/**
 * @file server.ts
 * @description Point d'entrée du serveur : démarrage sur le port défini dans les variables d'environnement.
 */

import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})
