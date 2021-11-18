// const { User } = require('../../models')

const currentUser = (req, res) => {
  const { email, subscription } = req.user
  console.log(email)

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { email, subscription },
  })
}
module.exports = currentUser
