const {z} = require('zod')

const signupSchema = z.object({
    email: z.email("email invalide"),
    password: z.string({required_error:"le mot de passe est requis"})
    .min(8,"le mot de passe doit contenir au moins 8 caracteres"),
})

const signinSchema = z.object({
    email: z.email("email invalide"),
    password: z.string({required_error:"le mot de passe est requis"})
    .min(8,"le mot de passe doit contenir au moins 8 caracteres"),
})


module.exports = {
    signupSchema,
    signinSchema
}