const prisma = require('../lib/prisma');

const listPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      user: { select: { id: true, username: true } },
      post_likes: true,
      comments: { take: 1 }, // por ejemplo, sólo el primer comentario
    },
  });
  return res.json(posts);
};

module.exports = {
  listPosts,
};
