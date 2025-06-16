const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { contactValidation } = require('../validations/contact.validation');
const validate = require('../middleware/validation.middleware');
const ContactController = require('../controllers/contact.controller');

// Create contact
router.post('/', auth, contactValidation, validate, ContactController.createContact);

// Get all contacts for a user
router.get('/', auth, ContactController.getAllContacts);

// Get single contact
router.get('/:id', auth, ContactController.getContact);

// Update contact
router.put('/:id', auth, contactValidation, validate, ContactController.updateContact);

// Delete contact
router.delete('/:id', auth, ContactController.deleteContact);

module.exports = router; 