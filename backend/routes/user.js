const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validate = require('../middleware/validate')
const {signupSchema, signinSchema} = require('../schemas/userSchema')

router.post('/signup', validate(signupSchema), userController.signup);
router.post('/login', validate(signinSchema), userController.signin);

module.exports = router;

