'use client';

import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import DeleteComment from './buttons/DeleteComment';
import toast from 'react-hot-toast';
import { deleteCommentApi } from '@/lib/api/posts';
import LikeButton from './buttons/LikeButton';

export default function UserComments({ comments, currentUser }) {
  const [userComments, setUserComments] = useState(comments);

  const handleDelete = async commentId => {
    try {
      await deleteCommentApi(commentId);
      setUserComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, content: '[comentario eliminado]', deleted: true }
            : comment
        )
      );
    } catch (err) {
      toast.error('No se pudo eliminar el comentario');
    }
  };

  return (
    <main className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-6">Tus Comentarios</h2>

      {userComments.length > 0 ? (
        <ul className="space-y-6 animate-fade-in">
          {userComments.map(comment => (
            <li
              key={comment.id}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <time className="text-xs text-gray-600">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </time>
                </div>
                <h1 className="text-black">{comment.post?.title ?? '[Post eliminado]'}</h1>
                <p className={comment.deleted ? 'italic text-gray-500' : 'text-gray-700'}>
                  {comment.deleted ? '[comentario eliminado]' : comment.content}
                </p>

                <div className="flex justify-between items-center text-black">
                  <div className="flex space-x-6">
                    <LikeButton
                      itemId={comment.id}
                      type="comment"
                      isLiked={comment.comment_likes?.some(
                        like => like.user_id === currentUser?.id
                      )}
                      totalLikes={comment.comment_likes?.length ?? 0}
                      isAuthenticated={!!currentUser}
                      disabled={comment.deleted}
                    />

                    <div className="flex justify-between items-center space-x-1">
                      <Link href={`/post/${comment.post_id}#comentarios`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer text-black hover:text-indigo-600" />
                      </Link>
                      <span>{comment.replies?.length ?? 0}</span>
                    </div>
                    {!comment.deleted && (
                      <DeleteComment commentId={comment.id} onDeleted={handleDelete} />
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center italic text-gray-500">Aún no tienes ningún comentario.</p>
      )}
    </main>
  );
}
