const User = require('../models/user')
const bcrypt = require('bcrypt')


exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(200).json({message:"utilisateur cree avec succes"}))
        .catch((err) => res.status(500).json({err}))
    })
    .catch((err) => res.status(500).json({err}))

}

exports.signin = (req, res, next) =>{
    
}