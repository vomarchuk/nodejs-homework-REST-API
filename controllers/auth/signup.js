const fs = require('fs/promises')
const path = require('path')

const gravatar = require('gravatar')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const { Conflict } = require('http-error')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email)
  const user = await User.findOne({ email })
  if (user) {
    return next(new Conflict(`user with email: '${email}' allready exist`))
  }

  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  const { id } = newUser
  const dirPath = path.join(userDir, id)
  await fs.mkdir(dirPath)
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

module.exports = signup
