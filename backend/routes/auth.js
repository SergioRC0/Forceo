// src/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../utils/googleStrategy');
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  verifyCaptcha,
  handleGoogleCallback,
} = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  authenticateToken,
} = require('../middleware/authMiddleware');

router.post('/register', verifyCaptcha, validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

router.post('/logout', logoutUser);

router.get('/profile', authenticateToken, getCurrentUser);

router.get('/users', getAllUsers);

// Ruta para iniciar el login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: process.env.CLIENT_ORIGIN + '/login',
  }),
  handleGoogleCallback
);

module.exports = router;
