const { BadRequest, Unauthorized } = require('http-error')
const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const repeatVerify = async (req, res, next) => {
  const { email } = req.body
  console.log(email)
  if (!email) {
    return next(new BadRequest('missing required field email'))
  }
  const user = await User.findOne({ email })
  if (!user) {
    return next(new Unauthorized('email or password was invalid'))
  }
  if (user.verify) {
    return next(new BadRequest('Verification has already been passed'))
  }

  const mail = {
    to: email,
    subject: 'verification email',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}">click for verification your email</a>`,
  }
  await sendMail(mail)

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification email sent',
    },
  })
}

module.exports = repeatVerify
