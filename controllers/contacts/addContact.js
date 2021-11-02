const contactOperations = require('../../models/contacts/contactOperations')
const addContact = async (req, res, next) => {
  try {
    const result = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
