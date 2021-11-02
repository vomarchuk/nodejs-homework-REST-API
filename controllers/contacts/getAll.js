const contactOperations = require('../../models/contacts/contactOperations')

const getAll = async (req, res, next) => {
  try {
    const result = await contactOperations.listContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAll
