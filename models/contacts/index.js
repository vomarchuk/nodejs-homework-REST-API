const listContacts = require('./contactOperations/listContacts');
const getContactById = require('./contactOperations/getContactById');
const removeContact = require('./contactOperations/removeContact');
const updateContacts = require('./contactOperations/updateContacts');

const addContact = async (body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
