'use client';
import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import DeletePost from './buttons/DeletePost';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LikeButton from './buttons/LikeButton';

export default function UserPosts({ posts, currentUser }) {
  // 1️⃣ Estado local de posts
  const [userPosts, setUserPosts] = useState(posts);
  const router = useRouter();
  // 2️⃣ Callback que pasamos al DeletePost
  const handleDelete = postId => {
    // Eliminamos de forma optimista la publicación con dicho ID
    setUserPosts(prev => prev.filter(post => post.id !== postId));
    router.refresh();
  };

  return (
    <main className="max-w-3xl mx-auto ">
      <h2 className="text-3xl font-extrabold text-center mb-6">Tus publicaciones</h2>

      {userPosts.length > 0 ? (
        <ul className="space-y-6 animate-fade-in">
          {userPosts.map(post => (
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
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold uppercase rounded-full">
                    {post.category.toLowerCase()}
                  </span>
                  <time className="text-xs text-gray-600">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{post.title}</h3>

                <p className="text-gray-700 line-clamp-3">{post.content}</p>

                <div className="flex justify-between items-center text-black">
                  <div className="flex space-x-6">
                    <LikeButton
                      itemId={post.id}
                      type="post"
                      isLiked={post.post_likes?.some(like => like.user_id === currentUser?.id)}
                      totalLikes={post.post_likes?.length ?? 0}
                      isAuthenticated={!!currentUser}
                    />

                    <div className="flex justify-between items-center space-x-1">
                      <Link href={`/post/${post.id}#comentarios`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer text-black hover:text-indigo-600" />
                      </Link>
                      <span>{post.comments?.length ?? 0}</span>
                    </div>
                  </div>

                  {/*  Pasamos post.id y el callback */}
                  <DeletePost postId={post.id} onDeleted={handleDelete} />
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
