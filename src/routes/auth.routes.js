const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('../validations/auth.validation');
const validate = require('../middleware/validation.middleware');
const AuthController = require('../controllers/auth.controller');

// Signup route
router.post('/signup', signupValidation, validate, AuthController.signup);

// Login route
router.post('/login', loginValidation, validate, AuthController.login);

module.exports = router; 