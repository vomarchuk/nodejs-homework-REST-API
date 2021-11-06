const express = require('express')
const router = express.Router()

const { contactControllers: ctrl } = require('../../controllers')
const controllerWrapper = require('../../middleware/controllerWrapper')

const {
  validation,
  validateAddContact,
  validateUpdateContact,
} = require('../../middleware')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post(
  '/',
  validation(validateAddContact),
  controllerWrapper(ctrl.addContact),
)

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch(
  '/:contactId',
  validation(validateUpdateContact),
  controllerWrapper(ctrl.updateById),
)

module.exports = router
