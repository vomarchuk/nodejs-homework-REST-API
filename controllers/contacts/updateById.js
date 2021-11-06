const { NotFound } = require('http-error')

const { Contact } = require('../../models')

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    return next(new NotFound(`Product with id=${contactId} not found`))
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateById
