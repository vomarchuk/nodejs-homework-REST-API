const { NotFound } = require('http-error')
const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    return next(new NotFound(`Contact with id=${contactId} not found`))
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
  })
}

module.exports = removeContact
