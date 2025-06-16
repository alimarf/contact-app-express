const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ResponseHandler = require('../utils/responseHandler');
const { JWT_EXPIRES_IN } = require('../config/constants');

class AuthController {
  static async signup(req, res) {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return ResponseHandler.badRequest(res, 'User already exists');
      }

      // Create new user
      const user = new User({
        email,
        password,
        name
      });

      await user.save();

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: JWT_EXPIRES_IN }
      );

      ResponseHandler.created(res, {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      }, 'User created successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error creating user', 500, error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return ResponseHandler.unauthorized(res, 'Invalid credentials');
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return ResponseHandler.unauthorized(res, 'Invalid credentials');
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: JWT_EXPIRES_IN }
      );

      ResponseHandler.success(res, {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      }, 'Login successful');
    } catch (error) {
      ResponseHandler.error(res, 'Error logging in', 500, error.message);
    }
  }
}

module.exports = AuthController; 