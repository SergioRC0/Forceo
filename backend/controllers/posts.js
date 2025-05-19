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

module.exports = {
  createPost,
  listUserPosts,
  deletePost,
};
