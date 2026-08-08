const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message:"utilisateur cree avec succes"}))
        .catch((err) => res.status(400).json({err}))
    })
    .catch((err) => res.status(400).json({err}))

}

exports.signin = (req, res, next) =>{
    User.findOne({email: req.body.email})
    .then( user => {
        if(user ===null){
            res.status(400).json({message:"paire identifiant/mot de passe incorrect"})
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then( valid => {
                if(!valid){
                   res.status(400).json({message:"paire identifiant/mot de passe incorrect"})
                }
                else{
                    res.status(200).json({
                        userId: user._id,
                        token:jwt.sign(
                            {userId_id: user._id},
                            "RANDOM_SECRET_TOKEN",
                            {expiresIn: "24h"}
                        )
                    })

                }
            })
            .catch((err) => res.status(500).json({err}))
        }
    })
    .catch((err) => res.status(500).json({err}))
}