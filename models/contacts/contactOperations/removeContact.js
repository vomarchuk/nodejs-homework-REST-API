const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => {
    console.log(Number(id) === Number(contactId));
    Number(id) === Number(contactId);
  });
  if (index !== -1) {
    return null;
  }
  const removeContact = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removeContact;
};
module.exports = removeContact;
