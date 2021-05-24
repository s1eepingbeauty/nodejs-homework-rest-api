const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    console.log(req.user)
    const contacts = await Contacts.getContacts()
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}

const getByID = async (req, res, next) => {
  const id = req.params.contactId
  try {
    const contact = await Contacts.getContactById(id)
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
  const body = req.body
  try {
    const contact = await Contacts.createContact(body)
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
  const id = req.params.contactId
  try {
    const contact = await Contacts.removeContact(id)
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
  const id = req.params.contactId
  const body = req.body
  try {
    const contact = await Contacts.updateContact(id, body)
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

// const patch = async (req, res, next) => {
//     const id = req.params.contactId
//     const body = req.body
//     try {
//       const contact = await Contacts.updateStatusContact(id, body)
//       if (contact) {
//         return res
//           .status(HttpCode.OK)
//           .json({ status: 'success', code: HttpCode.OK, data: { contact } })
//       }
//       return res
//         .status(HttpCode.NOT_FOUND)
//         .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not Found' })
//     } catch (error) {
//       next(error)
//     }
//   }

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
}
