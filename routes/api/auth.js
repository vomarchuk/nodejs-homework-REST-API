const express = require('express')
const router = express.Router()

const { authControllers: ctrl } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middleware/')

const { singupSchema } = require('../../models/user')

router.post('/singup', validation(singupSchema), controllerWrapper(ctrl.singup))

module.exports = router
