const contactOperations = require('../../models/contacts/contactOperations')
const getAll = async (req, res, next) => {
  const result = await contactOperations.listContacts()
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  })
}
module.exports = getAll
