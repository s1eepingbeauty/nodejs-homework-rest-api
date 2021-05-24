const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')

const {
  validateCreateContact,
  validateUpdateContact,
  validateStatusFavorite,
} = require('../../../validation/contactValidation')

router.get('/', guard, ctrl.getAll)

router.get('/:contactId', guard, ctrl.getByID)

router.post('/', guard, validateCreateContact, ctrl.create)

router.delete('/:contactId', guard, ctrl.remove)

router.put('/:contactId', guard, validateUpdateContact, ctrl.update)

router.patch('/:contactId/favorite', guard, validateStatusFavorite, ctrl.update)

module.exports = router
