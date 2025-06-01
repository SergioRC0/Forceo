// routes/posts.js
const express = require('express');
const {
  createPost,
  listUserPosts,
  deletePost,
  createComment,
  deleteComment,
  listUserComments,
  togglePostLike,
  toggleCommentLike,
  editPost,
  editComment,
} = require('../controllers/posts');
const {
  validateCreatePost,
  validateCreateComment,
  validateEditPost,
  validateEditComment,
} = require('../middleware/validators');
const { rateLimitMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Como todo este router se montó con authenticateToken,
// aquí sólo defines la lógica:
router.post('/createPost', rateLimitMiddleware, validateCreatePost, createPost);
router.get('/listPosts', listUserPosts);
router.delete('/:id', deletePost);
router.post('/comments', rateLimitMiddleware, validateCreateComment, createComment);
router.delete('/comments/:id', deleteComment);
router.get('/listComments', listUserComments);
router.post('/toggleLike', togglePostLike);
router.post('/comments/toggleLike', toggleCommentLike);
router.put('/:id', validateEditPost, editPost);
router.put('/comments/:id', validateEditComment, editComment);

// y en routes/posts.js

module.exports = router;
