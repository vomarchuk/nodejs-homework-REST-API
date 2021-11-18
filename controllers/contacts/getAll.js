const { Contact } = require('../../models')
const getAll = async (req, res, next) => {
  const { page, limit = 20 } = req.query

  const skip = page > 0 ? (page - 1) * limit : 0
  const { _id } = req.user
  const result = await Contact.find({ owner: _id }, 'id name email phone', {
    skip,
    limit: +limit,
  }).populate('owner', '_id email')
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  })
}
module.exports = getAll
