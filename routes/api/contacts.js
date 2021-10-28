const express = require('express');
const router = express.Router();

const { NotFound } = require('http-error');
const Joi = require('joi');

const contactOperations = require('../../models/contacts/index');

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: error,
    //   code: 500,
    //   message: 'Server error',
    // });
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
  const { error } = joiSchema.validate(req.body);
  if (error) {
  }

  res.json({ message: 'template message' });
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

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' }); // поменять можно на пут
});

module.exports = router;
