// src/routes/auth.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
} = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  authenticateToken,
} = require('../middleware/authMiddleware');

const passport = require('passport');
require('../utils/googleStrategy');

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
  (req, res) => {
    // Generar JWT y enviarlo como cookie
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      maxAge: 3600000,
    });

    // Redirigir al frontend (ajusta la ruta si tu frontend no está en /)
    res.redirect(process.env.CLIENT_ORIGIN + '/profile');
  }
);

module.exports = router;
