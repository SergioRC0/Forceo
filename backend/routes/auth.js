// src/routes/auth.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser,getCurrentUser,getAllUsers,verifyCaptcha} = require('../controllers/authController');
const { validateRegister, validateLogin, authenticateToken} = require('../middleware/authMiddleware');

router.post('/register',verifyCaptcha,validateRegister, registerUser);
router.post('/login',validateLogin, loginUser);

router.post('/logout', logoutUser);

router.get('/profile',authenticateToken,getCurrentUser);

router.get('/users',getAllUsers);

router.post("/verify-captcha",verifyCaptcha);

module.exports = router;
