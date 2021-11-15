const { Conflict } = require('http-error')
const { User } = require('../../models')

const singup = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next(new Conflict(`user with email: '${email}' allready exist`))
  }
  await User.create(req.body)

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email,
      subscription: 'starter',
    },
  })
}

module.exports = singup
