const validation = require('./validation')
const {
  validateAddContact,
  validateUpdateContact,
} = require('./validaveSchema')

const controllerWrapper = require('./controllerWrapper')

module.exports = {
  validation,
  validateAddContact,
  validateUpdateContact,
  controllerWrapper,
}
