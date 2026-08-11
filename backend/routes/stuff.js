const express = require('express')
const router = express.Router()
const stuffController = require('../controllers/stuff')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/', auth, stuffController.getAllThings)
router.post('/', auth, multer, stuffController.createThing)
router.get('/:id', auth, stuffController.getOneThing)
router.put('/:id', auth, stuffController.updateThing)
router.delete('/:id', auth, stuffController.deleteThing)

module.exports = router
