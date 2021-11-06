const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const updateContacts = require('./updateContacts')
const addContact = require('./addContact')
const updateContactById = require('./updateContactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContactById,
}
