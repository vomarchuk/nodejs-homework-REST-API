const { NotFound } = require('http-error')
const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
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
