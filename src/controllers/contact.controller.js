const Contact = require('../models/contact.model');
const ResponseHandler = require('../utils/responseHandler');

class ContactController {
  static async createContact(req, res) {
    try {
      const contact = new Contact({
        ...req.body,
        user: req.user._id
      });
      await contact.save();
      ResponseHandler.created(res, contact, 'Contact created successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error creating contact', 500, error.message);
    }
  }

  static async getAllContacts(req, res) {
    try {
      const contacts = await Contact.find({ user: req.user._id });
      ResponseHandler.success(res, contacts, 'Contacts retrieved successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error fetching contacts', 500, error.message);
    }
  }

  static async getContact(req, res) {
    try {
      const contact = await Contact.findOne({
        _id: req.params.id,
        user: req.user._id
      });
      
      if (!contact) {
        return ResponseHandler.notFound(res, 'Contact not found');
      }
      
      ResponseHandler.success(res, contact, 'Contact retrieved successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error fetching contact', 500, error.message);
    }
  }

  static async updateContact(req, res) {
    try {
      const contact = await Contact.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!contact) {
        return ResponseHandler.notFound(res, 'Contact not found');
      }
      
      ResponseHandler.success(res, contact, 'Contact updated successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error updating contact', 500, error.message);
    }
  }

  static async deleteContact(req, res) {
    try {
      const contact = await Contact.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });
      
      if (!contact) {
        return ResponseHandler.notFound(res, 'Contact not found');
      }
      
      ResponseHandler.success(res, null, 'Contact deleted successfully');
    } catch (error) {
      ResponseHandler.error(res, 'Error deleting contact', 500, error.message);
    }
  }
}

module.exports = ContactController; 