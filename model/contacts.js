const Contact = require('./schemas/contact')

const getContacts = async () => {
  return await Contact.find({})
}

const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId })
}

const createContact = async body => {
  return await Contact.create(body)
}

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId })
}

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
}

const updateStatusContact = async (contactId, body) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
