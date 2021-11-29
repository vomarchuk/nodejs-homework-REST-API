const express = require('express')
const router = express.Router()

const { authControllers: ctrl } = require('../../controllers')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middleware/')

const { singupSchema } = require('../../models/user')

router.post('/signup', validation(singupSchema), controllerWrapper(ctrl.signup))

router.post('/signin', validation(singupSchema), controllerWrapper(ctrl.signin))

router.post('/current', authenticate, controllerWrapper(ctrl.currentUser))

router.post('/signout', authenticate, controllerWrapper(ctrl.signout))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.repeatVerify))

router.patch(
  '/updateimg',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateImg),
)

module.exports = router
