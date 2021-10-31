const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async contactId => {
  const contacts = await listContacts()
  console.table(contacts)
  const index = contacts.findIndex(({ id }) => id === contactId)
  if (index === -1) {
    return null
  }
  const removeProduct = contacts.splice(index, 1)
  await updateContacts(contacts)
  return removeProduct
}

module.exports = removeContact
