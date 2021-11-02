const { BadRequest } = require('http-error')

const validation = schema => {
  const validationMiddelware = (req, res, next) => {
    try {
      const { error } = schema.validate(req.body)
      if (error) {
        return next(new BadRequest(error.message))
      }
      next()
    } catch (error) {
      next(error)
    }
  }
  return validationMiddelware
}

module.exports = validation
