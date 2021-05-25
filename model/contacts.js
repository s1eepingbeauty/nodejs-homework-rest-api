const Contact = require('./schemas/contact')

const getContacts = async (userId, query) => {
  // limit- сколько выводить результатов, offset- сколько записей нужно пропустить (отступ)
  const {
    limit = 5,
    page = 1,
    sortBy,
    sortByDesc,
    filter, // name|email|phone|favorite|owner
    favorite = null,
  } = query

  // console.log(Boolean(favorite)) // query - это строка (всегда true), boolParser (express-query-boolean)
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }

  const results = await Contact.paginate(optionsSearch, {
    limit,
    page,
    select: filter ? filter.split('|').join(' ') : '', // 'name email phone favorite owner'
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
  }) //  -_id - не показывать id
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
