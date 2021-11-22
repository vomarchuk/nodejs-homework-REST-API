const express = require('express')
const router = express.Router()

const { authControllers: ctrl } = require('../../controllers')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middleware/')

const { singupSchema } = require('../../models/user')

router.post('/signup', validation(singupSchema), controllerWrapper(ctrl.signup))

router.post('/signin', validation(singupSchema), controllerWrapper(ctrl.signin))

router.post('/current', authenticate, controllerWrapper(ctrl.currentUser))

router.post('/signout', authenticate, controllerWrapper(ctrl.signout))

module.exports = router
