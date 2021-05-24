const Contact = require('./schemas/contact')

const getContacts = async userId => {
  return await Contact.find({ owner: userId })
}

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId })
}

const createContact = async body => {
  return await Contact.create(body)
}

const removeContact = async (userId, contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId, owner: userId })
}

const updateContact = async (userId, contactId, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
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
