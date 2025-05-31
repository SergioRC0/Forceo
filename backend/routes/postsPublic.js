const express = require('express');
const { listPosts, getCommentsByPost, getPostById } = require('../controllers/postsPublic');

const router = express.Router();

router.get('/postsPublic', listPosts);
router.get('/comment/:postID', getCommentsByPost);
router.get('/getPost/:postID', getPostById);
module.exports = router;
