const Joi = require('joi')
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const numberPattern =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

const validateAddContact = Joi.object({
  name: Joi.string().pattern(namePattern, 'name').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(numberPattern, 'phone').required(),
})

const validateUpdateContact = Joi.object({
  name: Joi.string().pattern(namePattern, 'name'),
  email: Joi.string().email(),
  phone: Joi.string().pattern(numberPattern, 'phone'),
})

module.exports = { validateAddContact, validateUpdateContact }
