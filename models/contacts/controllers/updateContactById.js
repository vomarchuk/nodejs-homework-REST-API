const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(({ id }) => id === contactId)
  if (index === -1) {
    return null
  }
  contacts[index] = { ...contacts[index], ...body }
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = updateContactById
