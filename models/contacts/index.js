const listContacts = require('./contactOperations/listContacts');
const getContactById = require('./contactOperations/getContactById');
const removeContact = require('./contactOperations/removeContact');
const updateContacts = require('./contactOperations/updateContacts');
const addContact = require('./contactOperations/addContact');
const updateContactById = require('./contactOperations/updateContactById');
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContactById,
};
