const express = require('express')
const router = express.Router()

const { contactControllers: ctrl } = require('../../controllers')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middleware/')

const {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post(
  '/',
  authenticate,
  validation(addContactSchema),
  controllerWrapper(ctrl.addContact),
)

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(ctrl.removeContact),
)

router.put(
  '/:contactId',
  authenticate,
  validation(updateContactSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateStatusContactSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
