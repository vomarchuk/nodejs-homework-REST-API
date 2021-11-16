const { Conflict } = require('http-error')
const { User } = require('../../models')

const singup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next(new Conflict(`user with email: '${email}' allready exist`))
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

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
