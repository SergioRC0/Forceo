import React from 'react';
import { Heart } from 'lucide-react';
import LikeButton from '../buttons/LikeButton';

export default function PostCardUser({ post, currentUser }) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          {post.category?.toLowerCase()}
        </span>
        <time className="text-xs text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </time>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">{post.title}</h1>
      <p className="text-sm text-gray-600">Publicado por {post.user?.username || 'Anónimo'}</p>
      <div className="text-gray-800">{post.content}</div>
      <div className="mt-4 flex justify-end items-center space-x-1 text-black">
        <LikeButton
          itemId={post.id}
          type="post"
          isLiked={post.post_likes?.some(like => like.user_id === currentUser?.id)}
          totalLikes={post.post_likes?.length ?? 0}
          isAuthenticated={!!currentUser} // ✅ puedes mejorar esto con contexto si quieres
        />
      </div>
    </article>
  );
}
