// src/middleware/authMiddleware.js
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { RateLimiterMemory } = require('rate-limiter-flexible');

dotenv.config();

// Validación para registro
const validateRegister = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('Debes proporcionar un email válido')
    .isLength({ max: 25 })
    .withMessage('El email no debe superar los 25 caracteres'),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3, max: 15 })
    .withMessage('El nombre de usuario debe tener entre 3 y 15 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Solo se permiten letras, números y guiones bajos'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Contraseña obligatoria')
    .isLength({ min: 6, max: 15 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('emailOrUsername')
    .trim()
    .notEmpty()
    .withMessage('Debes proporcionar un usuario o email')
    .isLength({ min: 3, max: 25 })
    .withMessage('Debe tener entre 3 y 25 caracteres'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6, max: 15 })
    .withMessage('Debe tener entre 6 y 15 caracteres'),

  (req, res, next) => {
    console.log('BODY RECIBIDO:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// 5 peticiones por 10 segundos
const rateLimiter = new RateLimiterMemory({
  points: 5, // número de intentos
  duration: 10, // en segundos
});

const rateLimitMiddleware = (req, res, next) => {
  const key = req.user.id; // También puedes usar req.user.id si el usuario está autenticado
  console.log(`[RateLimit] Intento de ${key}`);
  rateLimiter
    .consume(key)
    .then(() => {
      next(); // Permite la petición
    })
    .catch(() => {
      res.status(429).json({
        message: 'Demasiadas peticiones. Intenta de nuevo en unos segundos.',
      });
    });
};

module.exports = { authenticateToken, validateRegister, validateLogin, rateLimitMiddleware };
