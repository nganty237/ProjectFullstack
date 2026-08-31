/**
 * @file stuff.ts
 * @description Routes CRUD pour l'entité Thing.
 */

import { Router } from 'express'
import * as stuffController from '../controllers/stuff'
import auth from '../middleware/auth'
import multer from '../middleware/multer-config'
import { thingIdParamSchema, creatThingSchema, updateThingSchema } from '../schemas/thingSchema'
import validate from '../middleware/validate'

const router = Router()

router.get('/', auth, stuffController.getAllThings)
router.post('/',    auth, multer, validate(creatThingSchema), stuffController.createThing)
router.get('/:id',  auth, validate(thingIdParamSchema, 'params'), stuffController.getOneThing)
router.put('/:id',  auth, validate(thingIdParamSchema, 'params'),multer, validate(updateThingSchema), stuffController.updateThing)
router.delete('/:id', auth, validate(thingIdParamSchema, 'params'), stuffController.deleteThing)

export default router
