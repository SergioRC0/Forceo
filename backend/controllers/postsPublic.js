const prisma = require('../lib/prisma');

const listPosts = async (req, res) => {
  const { category } = req.query;

  const posts = await prisma.post.findMany({
    where:
      category && category !== 'Todas'
        ? { category: category.toUpperCase() } // ⚠️ los enums deben ir en mayúsculas
        : {},
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      post_likes: true,
      comments: true,
    },
  });

  return res.json(posts);
};

const getCommentsByPost = async (req, res) => {
  const { postID } = req.params;

  try {
    const comentariosAnidados = await obtenerComentariosConRespuestas(null, postID);
    return res.json(comentariosAnidados);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

// Función recursiva para obtener comentarios con replies
async function obtenerComentariosConRespuestas(parentId, postId) {
  const comentarios = await prisma.comment.findMany({
    where: {
      post_id: postId,
      parent_id: parentId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      comment_likes: true,
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  const comentariosConRespuestas = await Promise.all(
    comentarios.map(async comentario => {
      const respuestas = await obtenerComentariosConRespuestas(comentario.id, postId);
      return {
        ...comentario,
        replies: respuestas,
      };
    })
  );

  return comentariosConRespuestas;
}

const getPostById = async (req, res) => {
  const { postID } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postID },
      include: {
        user: { select: { username: true } },
        post_likes: true,
      },
    });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    console.log('POST => ', post);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener post' });
  }
};

module.exports = { obtenerComentariosConRespuestas };

module.exports = {
  listPosts,
  getCommentsByPost,
  getPostById,
};
