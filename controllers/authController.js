const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for admin
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    sendTokenResponse(admin, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { adminId: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    }
  });
};

module.exports = { loginAdmin };