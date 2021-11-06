const { NotFound } = require('http-error')

const { Contact } = require('../../models')

const updateStatusContactSchema = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  )
  if (!result) {
    return next(new NotFound('Not found'))
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateStatusContactSchema
