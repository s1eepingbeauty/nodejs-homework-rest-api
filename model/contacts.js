const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join('./model/contacts.json')
const {v4: uuid} = require('uuid');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(({ id }) => id.toString() === contactId)
    return findContact
  } catch (error) {
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const filterContacts = contacts.filter(({ id }) => id.toString() !== contactId)
    if (contacts.length !== filterContacts.length) {
      await fs.writeFile(contactsPath, JSON.stringify(filterContacts, null, 2))
      return true
    }
    return false
  } catch (error) {
      console.log(error.message)
  }
}

const addContact = async (body) => {
   try {
    const contacts = await listContacts()
    const id = uuid()
    const newContact = {
      id,
      ...body,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
  } catch (error) {
      console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
      const contacts = await listContacts()
      let newContact = ''
      const newContacts = contacts.map((data) => {
        if (data.id.toString() === contactId) {
          newContact = { ...data, ...body }
          return newContact
        }
        return data
      })
      if (newContact !== '') {
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
        return newContact
      }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
