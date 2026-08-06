const express = require('express')
const app = express()
const cors = require('cors')//permet de gérer les requêtes cross-origin (CORS) pour autoriser les requêtes provenant de différents domaines.
const mongoose = require('mongoose')//permet de se connecter à la base de données MongoDB
require('dotenv').config()
const path = require('path')//permet de gérer les chemins de fichiers et de répertoires de manière indépendante du système d'exploitation.
app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/user')
const stuffRoutes = require('./routes/stuff')

app.use('/images',express.static(path.join(__dirname, 'images')))

mongoose.connect(process.env.MONGODB_URI)
.then(() =>console.log('connexion établie à MongoDB local'))
.catch((e) => console.log('connexion à MongoDB Atlas échouée', e))

app.use('/api/auth', userRoutes)
app.use('/api/stuff', stuffRoutes)
module.exports = app
