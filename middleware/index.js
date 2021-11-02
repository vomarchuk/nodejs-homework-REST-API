const validation = require('./validation')
const {
  validateAddContact,
  validateUpdateContact,
} = require('./validaveSchema')

module.exports = { validation, validateAddContact, validateUpdateContact }
