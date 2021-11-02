const { NotFound } = require('http-error')
const contactOperations = require('../../models/contacts/contactOperations')
const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.updateContactById(
      contactId,
      req.body,
    )
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
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
