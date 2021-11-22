const { Schema, model } = require('mongoose')
const Joi = require('joi')

const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const numberPattern =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const addContactSchema = Joi.object({
  name: Joi.string().pattern(namePattern, 'name').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(numberPattern, 'phone').required(),
  favorite: Joi.boolean(),
})

const updateContactSchema = Joi.object({
  name: Joi.string().pattern(namePattern, 'name'),
  email: Joi.string().email(),
  phone: Joi.string().pattern(numberPattern, 'phone'),
  favorite: Joi.boolean(),
})
const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
}
