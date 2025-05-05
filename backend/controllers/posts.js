/* const express = require('express');

const router = express.Router();

//  Mostrar todos los posts con autor
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        post.id,
        post.title,
        post.content,
        post.like_count,
        post.created_at,
        "user".username AS author
      FROM post
      JOIN "user" ON post.user_id = "user".id
      ORDER BY post.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

module.exports = router; */