const express = require('express');
const { listPosts } = require('../controllers/postsPublic');

const router = express.Router();

router.get('/postsPublic', listPosts);

module.exports = router;
