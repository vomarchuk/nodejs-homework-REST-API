const { NotFound } = require('http-error')
const contactOperations = require('../../models/contacts/contactOperations')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.removeContact(contactId)
    if (!result) {
      return next(new NotFound(`Contact with id=${contactId} not found`))
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    })
  } catch (error) {
    next()
  }
}

module.exports = removeContact
