const fs = require('fs/promises');
const contactsPath = require('../contactsPath');
const updateContacts = async (newContact) => {
  const contactStr = JSON.stringify(newContact);
  await fs.writeFile(contactsPath, contactStr);
};

module.exports = updateContacts;
