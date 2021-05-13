const db = require('./db')
const { ObjectId } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const getContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const result = await collection.find({}).toArray() // find возвращает курсор, преобразовываем курсор в массив
  return result
}

const getContactById = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const [result] = await collection
    .find({ _id: new ObjectId(contactId) })
    .toArray()
  return result
}

const removeContact = async contactId => {
  const collection = await getCollection(db, 'contacts')
  const { value: result } = await collection.findOneAndDelete({
    _id: new ObjectId(contactId),
  })
  return result
}

const addContact = async body => {
  const collection = await getCollection(db, 'contacts')
  const record = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  }
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const { value: result } = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(contactId),
    },
    { $set: body },
    { returnOriginal: false },
  )
  return result
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
