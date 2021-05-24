const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const validateUser = require('../../../validation/userValidation')

router.post('/signup', validateUser, ctrl.signup)
router.post('/login', validateUser, ctrl.login)
router.post('/logout', ctrl.logout)

module.exports = router
