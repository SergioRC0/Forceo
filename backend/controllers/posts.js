// src/controllers/posts.js
const { CategoryType } = require('../generated/prisma'); // o desde '@prisma/client'
const prisma = require('../lib/prisma');

//lo de aqui lo tenemos protegido por el middleware
const createPost = async (req, res) => {
  const { category, title, content } = req.body;
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // Validación mínima: compruebo que 'category' es uno de los valores del enum
  if (!Object.values(CategoryType).includes(category)) {
    return res.status(400).json({
      error: `Categoría inválida. Debe ser una de: ${Object.values(CategoryType).join(', ')}`,
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        user_id: userId,
        category, // aquí uso directamente la cadena, Prisma la castea al enum
        title,
        content,
      },
      select: {
        id: true,
        user_id: true,
        category: true,
        title: true,
        content: true,
        created_at: true,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error('Error creando post:', err);
    return res.status(500).json({ error: 'Error al crear el post' });
  }
};

const listUserPosts = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'No autorizado' });
  const posts = await prisma.post.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      post_likes: true,
      comments: true, // por ejemplo, sólo el primer comentario
    },
  });
  return res.json(posts);
};

const listUserComments = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'No autorizado' });
  const comments = await prisma.comment.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      post: { select: { id: true, title: true } }, // para saber de q post viene
      replies: true,
      comment_likes: true,
    },
  });
  return res.json(comments);
};

//Delete POST
const deletePost = async (req, res) => {
  const { id } = req.params; // suponemos que el id del post viene por URL
  const userId = req.user?.id; // suponiendo que ya autenticás al usuario

  try {
    // 1. Verificamos si el post existe y pertenece al usuario
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para borrar este post' });
    }

    // 2. Borramos el post
    const deletedPost = await prisma.post.delete({
      where: { id },
      select: {
        id: true,
        user_id: true,
        category: true,
        title: true,
        content: true,
        created_at: true,
      },
    });

    return res.status(200).json(deletedPost);
  } catch (err) {
    console.error('Error borrando post:', err);
    return res.status(500).json({ error: 'Error al borrar el post' });
  }
};
const createComment = async (req, res) => {
  const { postId, content, parentId } = req.body;
  const userId = req.user?.id; // debe venir del middleware de autenticación

  if (!postId || !userId || !content) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear comentario' });
  }
};

// en controllers/posts.js

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para borrar este comentario' });
    }

    // Soft delete: marcar como eliminado y borrar el contenido
    const updated = await prisma.comment.update({
      where: { id },
      data: { content: '[comentario eliminado]', deleted: true },
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Error al marcar comentario como eliminado:', err);
    return res.status(500).json({ error: 'Error al eliminar comentario' });
  }
};
// Dar o quitar like a un post
const togglePostLike = async (req, res) => {
  const userId = req.user?.id;
  const { postId } = req.body;

  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  try {
    const existing = await prisma.post_like.findUnique({
      where: { user_id_post_id: { user_id: userId, post_id: postId } },
    });

    if (existing) {
      await prisma.post_like.delete({
        where: { user_id_post_id: { user_id: userId, post_id: postId } },
      });
      return res.json({ liked: false });
    } else {
      await prisma.post_like.create({
        data: { user_id: userId, post_id: postId },
      });
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error('Error al togglear like de post:', err);
    return res.status(500).json({ error: 'Error al dar like' });
  }
};
const toggleCommentLike = async (req, res) => {
  const userId = req.user?.id;
  const { commentId } = req.body;

  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  try {
    const existing = await prisma.comment_like.findUnique({
      where: { user_id_comment_id: { user_id: userId, comment_id: commentId } },
    });

    if (existing) {
      await prisma.comment_like.delete({
        where: { user_id_comment_id: { user_id: userId, comment_id: commentId } },
      });
      return res.json({ liked: false });
    } else {
      await prisma.comment_like.create({
        data: { user_id: userId, comment_id: commentId },
      });
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error('Error al togglear like de comentario:', err);
    return res.status(500).json({ error: 'Error al dar like' });
  }
};
const editPost = async (req, res) => {
  const { id } = req.params; // ID del post
  const { title, content, category } = req.body;
  const userId = req.user?.id;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar este post' });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
      include: {
        post_likes: true,
        comments: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Error al editar post:', err);
    return res.status(500).json({ error: 'Error al editar el post' });
  }
};
const editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'El contenido no puede estar vacío' });
  }

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para editar este comentario' });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        user: {
          select: { id: true, username: true },
        },
        comment_likes: true,
        replies: {
          select: { id: true }, // solo para mantener estructura si se usa
        },
      },
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Error al editar comentario:', err);
    return res.status(500).json({ error: 'Error al editar el comentario' });
  }
};

module.exports = {
  createPost,
  listUserPosts,
  deletePost,
  createComment,
  deleteComment,
  listUserComments,
  toggleCommentLike,
  togglePostLike,
  editPost,
  editComment,
};
