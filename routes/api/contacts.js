const express = require('express')
const router = express.Router()

const { NotFound, BadRequest } = require('http-error')

const contactOperations = require('../../models/contacts/index')

const {
  validateAddContact,
  validateUpdateContact,
} = require('../../models/contacts/contactOperations/validaveOptions')

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

router.post('/', async (req, res, next) => {
  try {
    const { error } = validateAddContact.validate(req.body)
    if (error) {
      return next(new BadRequest(error.message))
    }
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

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = validateUpdateContact.validate(req.body)
    if (error) {
      return next(new BadRequest(error.message))
    }
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
  } catch (error) {
    next(error)
  }
})

module.exports = router
