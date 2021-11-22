const { Unauthorized, NotFound } = require('http-error')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(new Unauthorized('Not authorized'))
    }
    const [bearer, token] = await req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      return next(new Unauthorized('Not authorized'))
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user) {
        return next(new NotFound('user not Found'))
      }
      if (!user.token) {
        return next(new Unauthorized('Not authorized'))
      }
      req.user = user
      next()
    } catch (error) {
      return next(new Unauthorized(error.message))
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = authenticate
