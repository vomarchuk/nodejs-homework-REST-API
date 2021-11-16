const express = require('express')
const router = express.Router()

const { authControllers: ctrl } = require('../../controllers')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middleware/')

const { singupSchema } = require('../../models/user')

router.post('/singup', validation(singupSchema), controllerWrapper(ctrl.singup))

router.post('/singin', validation(singupSchema), controllerWrapper(ctrl.singin))

router.post('/singout', authenticate, controllerWrapper(ctrl.singout))

module.exports = router
