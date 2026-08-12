/**
 * @file user.ts
 * @description Routes d'authentification : inscription et connexion.
 */

import { Router } from 'express'
import * as userController from '../controllers/user'
import validate from '../middleware/validate'
import { signupSchema, signinSchema } from '../schemas/userSchema'

const router = Router()

router.post('/signup', validate(signupSchema), userController.signup)
router.post('/login',  validate(signinSchema),  userController.signin)

export default router
