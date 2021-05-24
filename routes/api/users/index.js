const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const validateCreateUser = require('../../../validation/userValidation')

router.post('/signup', validateCreateUser, ctrl.signup)
router.post('/login', ctrl.login)
router.post('/logout', ctrl.logout)

module.exports = router
