// src/routes/auth.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser,getCurrentUser,getAllUsers } = require('../controllers/authController');
const { validateRegister, validateLogin, authenticateToken } = require('../middleware/authMiddleware');
const passport = require('../utils/googleStrategy');



router.post('/register',validateRegister, registerUser);
router.post('/login',validateLogin, loginUser);

router.post('/logout', logoutUser);

router.get('/profile',authenticateToken,getCurrentUser);

router.get('/users',getAllUsers);

// Ruta para iniciar login con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Genera JWT y setea cookie
    const token = require('jsonwebtoken').sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
      maxAge: 3600000,
    });
    // Redirige al frontend (ajusta la URL si es necesario)
    res.redirect(process.env.CLIENT_ORIGIN + 'profile');
  }
);

module.exports = router;
