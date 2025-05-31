// components/Post/PostActions.jsx
'use client';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import LikeButton from '../buttons/LikeButton';
export default function PostActions({ post, currentUserId }) {
  return (
    <div className="mt-4 flex justify-between items-center text-black">
      <Link href={`/post/${post.id}`} className="text-indigo-600 font-medium hover:underline">
        Leer más →
      </Link>
      <div className="flex items-center space-x-4">
        <LikeButton
          itemId={post.id}
          isLiked={post.post_likes?.some(like => like.user_id === currentUserId?.id)}
          totalLikes={post.post_likes?.length ?? 0}
          type="post"
          isAuthenticated={!!currentUserId}
        />
        <Link href={`/post/${post.id}#comentarios`} className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
          <span className="text-sm">{post.comments?.length ?? 0}</span>
        </Link>
      </div>
    </div>
  );
}
