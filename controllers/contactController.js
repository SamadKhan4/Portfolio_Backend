const Contact = require('../models/Contact');

// @desc    Send message via contact form
// @route   POST /api/contact
// @access  Public
exports.sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
exports.getMessages = async (req, res, next) => {
  try {
    // Sort by newest first
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};