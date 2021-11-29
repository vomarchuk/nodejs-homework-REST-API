const { NotFound } = require('http-error')
const { User } = require('../../models')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return next(new NotFound('User not found'))
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification successful',
    },
  })
}

module.exports = verify
