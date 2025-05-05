// src/routes/auth.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser,getCurrentUser,getAllUsers } = require('../controllers/authController');
const { validateRegister, validateLogin, authenticateToken } = require('../middleware/authMiddleware');



router.post('/register',validateRegister, registerUser);
router.post('/login',validateLogin, loginUser);

router.post('/logout', logoutUser);

router.get('/profile',authenticateToken,getCurrentUser);

router.get('/users',getAllUsers);

module.exports = router;
