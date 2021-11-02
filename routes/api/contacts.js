const express = require('express')
const router = express.Router()

const contactControllers = require('../../controllers')

const {
  validation,
  validateAddContact,
  validateUpdateContact,
} = require('../../middleware')

router.get('/', contactControllers.getAll)

router.get('/:contactId', contactControllers.getById)

router.post('/', validation(validateAddContact), contactControllers.addContact)

router.delete('/:contactId', contactControllers.removeContact)

router.patch(
  '/:contactId',
  validation(validateUpdateContact),
  contactControllers.updateById,
)

module.exports = router
