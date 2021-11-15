const express = require('express')
const router = express.Router()

const { contactControllers: ctrl } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middleware/')

const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require('../../models/contact')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post(
  '/',
  validation(addContactSchema),
  controllerWrapper(ctrl.addContact),
)

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch(
  '/:contactId',
  validation(updateContactSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  validation(updateStatusContactSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
