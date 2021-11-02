const express = require('express')
const router = express.Router()

const { NotFound } = require('http-error')

const contactOperations = require('../../models/contacts/index')

const validation = require('../../middleware/validation')

const {
  validateAddContact,
  validateUpdateContact,
} = require('../../middleware/validaveOptions')

router.get('/', async (req, res, next) => {
  try {
    const result = await contactOperations.listContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.getContactById(contactId)
    if (!result) {
      return next(new NotFound(`Contact with id=${contactId} not found`))
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', validation(validateAddContact), async (req, res, next) => {
  try {
    const result = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.removeContact(contactId)
    if (!result) {
      return next(new NotFound(`Contact with id=${contactId} not found`))
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    })
  } catch (error) {
    next()
  }
})

router.patch(
  '/:contactId',
  validation(validateUpdateContact),
  async (req, res, next) => {
    const { contactId } = req.params
    const result = await contactOperations.updateContactById(
      contactId,
      req.body,
    )
    if (!result) {
      return next(new NotFound(`Product with id=${contactId} not found`))
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  },
)

module.exports = router
