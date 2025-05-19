// routes/posts.js
const express = require('express');
const { createPost, listUserPosts,deletePost } = require('../controllers/posts');

const router = express.Router();

// Como todo este router se montó con authenticateToken,
// aquí sólo defines la lógica:
router.post('/createPost', createPost);
router.get('/listPosts', listUserPosts);
router.delete('/deletePost',deletePost);

module.exports = router;
