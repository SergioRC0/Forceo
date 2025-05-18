// routes/posts.js
const express = require('express');
const { createPost, listUserPosts } = require('../controllers/posts');

const router = express.Router();

// Como todo este router se montó con authenticateToken,
// aquí sólo defines la lógica:
router.post('/createPost', createPost);
router.get('/listPosts', listUserPosts);

module.exports = router;
