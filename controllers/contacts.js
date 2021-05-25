const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { contacts, total, limit, page } = await Contacts.getContacts(
      userId,
      req.query,
    )
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { total, limit, page, contacts },
    })
  } catch (error) {
    next(error)
  }
}

const getByID = async (req, res, next) => {
  const userId = req.user.id
  const contactId = req.params.contactId
  try {
    const contact = await Contacts.getContactById(userId, contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  const userId = req.user.id
  const body = req.body
  try {
    const contact = await Contacts.createContact({ ...body, owner: userId })
    return res.status(HttpCode.CREATED).json({
      status: 'created',
      code: HttpCode.CREATED,
      data: { contact },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = HttpCode.BAD_REQUEST
    }
    next(error)
  }
}

const remove = async (req, res, next) => {
  const userId = req.user.id
  const contactId = req.params.contactId
  try {
    const contact = await Contacts.removeContact(userId, contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Contact deleted',
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    })
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  const userId = req.user.id
  const contactId = req.params.contactId
  const body = req.body
  try {
    const contact = await Contacts.updateContact(userId, contactId, body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    })
  } catch (error) {
    next(error)
  }
}

const patch = async (req, res, next) => {
  const userId = req.user.id
  const contactId = req.params.contactId
  const body = req.body

  try {
    const contact = await Contacts.updateStatusContact(userId, contactId, body)

    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }

    return res
      .status(HttpCode.NOT_FOUND)
      .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
  patch,
}
