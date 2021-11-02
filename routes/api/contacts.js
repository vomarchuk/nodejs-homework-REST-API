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
    const contacts = await contactOperations.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactOperations.getContactById(contactId)
    if (!contact) {
      return next(new NotFound(`Contact with id=${contactId} not found`))
    }
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
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
    res.json({
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
    res.json({ status: 'success', code: 200, message: 'Remove success' })
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
    res.json({
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
