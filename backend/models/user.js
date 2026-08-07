const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator').default//permet de valider l'unicité des champs dans le schéma Mongoose.

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.plugin(uniqueValidator)//applique le plugin uniqueValidator au schéma userSchema pour valider l'unicité de l'email.
module.exports = mongoose.model('User', userSchema)