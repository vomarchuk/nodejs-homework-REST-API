const { NotFound } = require('http-error')
const contactOperations = require('../../models/contacts/contactOperations')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactOperations.getContactById(contactId)
  if (!result) {
    return next(new NotFound(`Contact with id=${contactId} not found`))
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  })
}

module.exports = getById
