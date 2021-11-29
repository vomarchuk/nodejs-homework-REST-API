const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const { sendMail } = require('../../helpers')
const gravatar = require('gravatar')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const { Conflict } = require('http-error')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'https', s: 250 })
  const user = await User.findOne({ email })
  if (user) {
    return next(new Conflict(`user with email: '${email}' allready exist`))
  }
  const verificationToken = uuidv4()
  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  const { id } = newUser
  const dirPath = path.join(userDir, id)
  await fs.mkdir(dirPath)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'verification email',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">click for verification your email</a>`,
  }
  await sendMail(mail)

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
