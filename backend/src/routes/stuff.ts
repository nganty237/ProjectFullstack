/**
 * @file stuff.ts
 * @description Routes CRUD pour l'entité Thing.
 */

import { Router } from 'express'
import * as stuffController from '../controllers/stuff'
import auth from '../middleware/auth'
import multer from '../middleware/multer-config'

const router = Router()

router.get('/',     auth, stuffController.getAllThings)
router.post('/',    auth, multer, stuffController.createThing)
router.get('/:id',  auth, stuffController.getOneThing)
router.put('/:id',  auth, multer, stuffController.updateThing)
router.delete('/:id', auth, stuffController.deleteThing)

export default router
