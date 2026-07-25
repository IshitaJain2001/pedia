const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../controllers/chatbotController');

router.post('/chatbot', getChatbotResponse);

module.exports = router;
