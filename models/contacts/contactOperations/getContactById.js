const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => Number(id) === Number(contactId));
  return !result ? null : result;
};

module.exports = getContactById;
