const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const {
  validateCreateContact,
  validateUpdateContact,
  validateStatusFavorite,
} = require('./validation')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getByID)

router.post('/', validateCreateContact, ctrl.create)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', validateUpdateContact, ctrl.update)

router.patch('/:contactId/favorite', validateStatusFavorite, ctrl.update)

module.exports = router
