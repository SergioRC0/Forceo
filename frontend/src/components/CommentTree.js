'use client';
import { useState } from 'react';
import CommentForm from './forms/CommentForm';
import { Heart } from 'lucide-react';
import DeleteComment from './buttons/DeleteComment';
import LikeButton from './buttons/LikeButton';
const REPLIES_PREVIEW_COUNT = 0;

export default function CommentTree({ comments, currentUser, onCommentPosted, onCommentDeleted }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [expanded, setExpanded] = useState(new Set());

  const toggleExpanded = commentId => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(commentId) ? next.delete(commentId) : next.add(commentId);
      return next;
    });
  };

  const renderActions = comment => (
    <div className="mt-2 flex justify-between items-center">
      <div className="flex space-x-4">
        {currentUser && !comment.deleted && (
          <>
            <button
              className="text-blue-600 text-sm"
              onClick={() => setReplyingTo(prev => (prev === comment.id ? null : comment.id))}
            >
              {replyingTo === comment.id ? 'Cancelar' : 'Responder'}
            </button>

            {currentUser?.id === comment.user?.id && (
              <DeleteComment commentId={comment.id} onDeleted={onCommentDeleted} />
            )}
          </>
        )}
      </div>

      <LikeButton
        itemId={comment.id}
        type="comment"
        isLiked={comment.comment_likes?.some(like => like.user_id === currentUser?.id)}
        totalLikes={comment.comment_likes?.length ?? 0}
        isAuthenticated={!!currentUser}
        disabled={comment.deleted}
      />
    </div>
  );

  const renderRepliesToggle = (comment, hasMore, isExpanded, remaining) => (
    <>
      {hasMore && !isExpanded && (
        <button className="text-sm text-blue-600 mt-1" onClick={() => toggleExpanded(comment.id)}>
          Ver {remaining} {remaining === 1 ? 'respuesta' : 'respuestas'} más
        </button>
      )}
      {hasMore && isExpanded && (
        <button className="text-sm text-blue-600 mt-1" onClick={() => toggleExpanded(comment.id)}>
          Ocultar respuestas
        </button>
      )}
    </>
  );

  return (
    <ul className="pl-4 border-l-2 border-gray-300 text-black">
      {comments.map(comment => {
        const hasReplies = comment.replies?.length > 0;
        const isExpanded = expanded.has(comment.id);
        const remaining = (comment.replies?.length ?? 0) - REPLIES_PREVIEW_COUNT;
        const hasMore = remaining > 0;
        const repliesToShow =
          hasMore && !isExpanded
            ? comment.replies.slice(0, REPLIES_PREVIEW_COUNT)
            : comment.replies;

        return (
          <li key={comment.id} className="mb-4">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm font-semibold">{comment.user?.username}</p>
              <p className={comment.deleted ? 'italic text-gray-500' : ''}>
                {comment.deleted ? '[comentario eliminado]' : comment.content}
              </p>
              {renderActions(comment)}
            </div>

            {replyingTo === comment.id && currentUser?.id && (
              <div className="ml-4">
                <CommentForm
                  parentId={comment.id}
                  onCommentPosted={(pid, txt) => {
                    setReplyingTo(null);
                    onCommentPosted(pid, txt);
                  }}
                />
              </div>
            )}

            {hasReplies && (
              <div className="ml-4">
                <CommentTree
                  comments={repliesToShow}
                  currentUser={currentUser}
                  onCommentPosted={onCommentPosted}
                  onCommentDeleted={onCommentDeleted}
                />
                {renderRepliesToggle(comment, hasMore, isExpanded, remaining)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
