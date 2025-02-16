require('dotenv').config()

const jwt = require('jsonwebtoken')
const { Unauthorized, BadRequest } = require('http-error')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const signin = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    return next(new Unauthorized('email or password was invalid'))
  }
  if (!user.verify) {
    return next(new BadRequest('Sorry, need verify your email'))
  }
  const { subscription, _id } = user

  const payload = {
    id: _id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(_id, { token })
  res.status(200).json({
    status: 'success',
    token,
    user: {
      email,
      subscription,
    },
  })
}

module.exports = signin
