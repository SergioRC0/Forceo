// components/UserPosts.jsx
import { Heart, MessageCircle } from 'lucide-react';

export default function UserPosts({ posts }) {
  return (
    <main className="max-w-3xl mx-auto  ">
      <h2 className="text-3xl font-extrabold title-style text-center mb-6">Tus publicaciones</h2>

      {posts.length > 0 ? (
        <ul className="space-y-6 grid-cols-3">
          {posts.map(post => (
            <li
              key={post.id}
              className="
                bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
                border-l-4 border-indigo-500
                rounded-xl shadow-lg
                transform hover:scale-105 hover:shadow-2xl
                transition-all duration-300
                overflow-hidden
              "
            >
              <div className="p-6 flex flex-col space-y-4">
                {/* Badge + Fecha */}
                <div className="flex justify-between items-center">
                  <span
                    className="
                    inline-block px-3 py-1
                    bg-indigo-600 text-white text-xs font-semibold
                    uppercase rounded-full
                  "
                  >
                    {post.category.toLowerCase()}
                  </span>
                  <time className="text-xs text-gray-600">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{post.title}</h3>

                {/* Extracto */}
                <p className="text-gray-700 line-clamp-3">{post.content}</p>

                {/* Likes & Comentarios */}
                <div className="flex space-x-6 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-5 h-5" />
                    <span>{post.post_likes?.length ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments?.length ?? 0}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center italic text-gray-500">Aún no tienes ninguna publicación.</p>
      )}
    </main>
  );
}
