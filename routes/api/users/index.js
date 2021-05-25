const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const {
  validateUser,
  validateSubscription,
} = require('../../../validation/userValidation')

router.post('/signup', validateUser, ctrl.signup)
router.post('/login', validateUser, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.patch('/:userId/subscription', guard, validateSubscription, ctrl.patch)

module.exports = router
