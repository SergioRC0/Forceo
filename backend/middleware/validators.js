// src/middleware/validators.js
const { body, validationResult } = require('express-validator');

// Validación para crear una publicación
const validateCreatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 5, max: 255 })
    .withMessage('El título debe tener entre 5 y 255 caracteres'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido no puede estar vacío')
    .isLength({ min: 10 })
    .withMessage('El contenido debe tener al menos 10 caracteres'),

  body('category')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isIn(['BALONCESTO', 'FUTBOL', 'TENIS'])
    .withMessage('Categoría no válida'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para crear un comentario (o respuesta)
const validateCreateComment = [
  body('postId').notEmpty().withMessage('Debe proporcionarse el ID de la publicación'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('El comentario no puede estar vacío')
    .isLength({ min: 2, max: 1000 })
    .withMessage('El comentario debe tener entre 2 y 1000 caracteres'),

  body('parentId')
    .optional({ nullable: true })
    .custom(value => {
      if (value === null) return true;
      if (typeof value === 'string' && /^[0-9a-fA-F-]{36}$/.test(value)) return true;
      throw new Error('El ID del comentario padre debe ser válido');
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
// Validación para editar una publicación
const validateEditPost = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('El título debe tener entre 5 y 255 caracteres'),

  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('El contenido debe tener al menos 10 caracteres'),

  body('category')
    .optional()
    .isIn(['BALONCESTO', 'FUTBOL', 'TENIS'])
    .withMessage('Categoría no válida'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
// Validación para editar un comentario
const validateEditComment = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El comentario no puede estar vacío')
    .isLength({ min: 2, max: 1000 })
    .withMessage('El comentario debe tener entre 2 y 1000 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreatePost,
  validateCreateComment,
  validateEditPost,
  validateEditComment,
};
