const Joi = require('joi')

const options = {
  name: {
    pattern: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  },
  number: {
    pattern:
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
  },
}

const { name, number } = options

const validateAddContact = Joi.object({
  name: Joi.string().min(3).max(30).pattern(name.pattern, 'name').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(number.pattern, 'phone').required(),
})

const validateUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).pattern(name.pattern, 'name'),
  email: Joi.string().email(),
  phone: Joi.string().pattern(number.pattern, 'phone'),
})

module.exports = { validateAddContact, validateUpdateContact }
