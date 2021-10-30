const express = require('express');
const router = express.Router();

const { NotFound, BadRequest } = require('http-error');
const Joi = require('joi');

const contactOperations = require('../../models/contacts/index');

const {
  name,
  number,
} = require('../../models/contacts/contactOperations/validaveOptions');

const validateAddContact = Joi.object({
  name: Joi.string().min(3).max(30).pattern(name.pattern, 'name').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(number.pattern, 'phone').required(),
});
const validateUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).pattern(name.pattern, 'name'),
  email: Joi.string().email(),
  phone: Joi.string().pattern(number.pattern, 'phone'),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const { error } = validateAddContact.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const result = await contactOperations.addContact(req.body);
    res.json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({ status: 'success', code: 200, message: 'Remove success' });
  } catch (error) {
    next();
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = validateUpdateContact.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const result = await contactOperations.updateContactById(
      contactId,
      req.body,
    );
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
