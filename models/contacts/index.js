const listContacts = require('./controllers/listContacts')
const getContactById = require('./controllers/getContactById')
const removeContact = require('./controllers/removeContact')
const updateContacts = require('./controllers/updateContacts')
const addContact = require('./controllers/addContact')
const updateContactById = require('./controllers/updateContactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContactById,
}
