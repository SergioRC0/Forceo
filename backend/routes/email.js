const express = require('express');
const { sendEmailController } = require('../controllers/emailController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', authenticateToken, sendEmailController);

module.exports = router;