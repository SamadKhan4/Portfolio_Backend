const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getMessages
} = require('../controllers/contactController');

router.route('/')
  .post(sendMessage)
  .get(protect, getMessages);

module.exports = router;