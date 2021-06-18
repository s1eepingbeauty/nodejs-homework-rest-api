const Contact = require('./schemas/contact')

const getContacts = async (userId, query) => {
  const {
    limit = 5,
    page = 1,
    sortBy,
    sortByDesc,
    filter,
    isFavorite = null,
  } = query

  const optionsSearch = { owner: userId }

  if (isFavorite !== null) {
    optionsSearch.isFavorite = isFavorite
  }

  const results = await Contact.paginate(optionsSearch, {
    limit,
    page,
    select: filter ? filter.split('|').join(' ') : '',
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
  })

  const { docs: contacts, totalDocs: total } = results

  return { contacts, total, limit, page }
}

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })
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
