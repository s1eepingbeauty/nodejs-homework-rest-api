const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const {
  validateUser,
  validateSubscription,
} = require('../../../validation/userValidation')

router.post('/signup', validateUser, ctrl.signup)
router.post('/login', validateUser, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.patch('/:userId/subscription', guard, validateSubscription, ctrl.patch)
router.get('/current', guard, ctrl.currentUser)
router.patch('/avatars', [guard, upload.single('avatar')], ctrl.avatars) // 1(single) картинка с именем поля avatar
router.get('/verify/:verificationToken', ctrl.verify)

module.exports = router
