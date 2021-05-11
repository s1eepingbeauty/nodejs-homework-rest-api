const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validateAddContact,
  validateUpdateContact,
} = require('./validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.getContacts()
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const contact = await Contacts.getContactById(id)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', validateAddContact, async (req, res, next) => {
  const body = req.body;
  try {
    const contact = await Contacts.addContact(body)
    if (contact) {
      return res
        .status(201)
        .json({ status: 'created', code: 201, data: { contact } })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const contact = await Contacts.removeContact(id)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, message: 'Contact deleted' })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateUpdateContact, async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  try {
    const contact = await Contacts.updateContact(id, body)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
