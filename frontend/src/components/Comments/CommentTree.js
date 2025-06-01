'use client';
import { useState } from 'react';
import CommentForm from '../forms/CommentForm';
import EditCommentForm from '../forms/EditCommentForm';
import { updateCommentInTree } from '@/hooks/useComments';
import CommentActions from './CommentActions';
import { useEffect } from 'react';
import ExpandableText from '../ui/ExpandableText';
const REPLIES_PREVIEW_COUNT = 0;

export default function CommentTree({ comments, currentUser, onCommentPosted, onCommentDeleted }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentList, setCommentList] = useState(comments);
  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const toggleExpanded = commentId => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(commentId) ? next.delete(commentId) : next.add(commentId);
      return next;
    });
  };

  const renderActions = comment => (
    <CommentActions
      comment={comment}
      currentUser={currentUser}
      onEdit={c => {
        setCommentToEdit(c);
        setShowModal(true);
      }}
      onDelete={() => onCommentDeleted(comment.id)}
      onReply={() => setReplyingTo(prev => (prev === comment.id ? null : comment.id))}
      showReply={true}
      isReplying={replyingTo === comment.id}
    />
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
    <>
      <ul className="pl-4 border-l-2  border-gray-300 text-black">
        {commentList.map(comment => {
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
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <p className="user-style text-sm text-black">{comment.user?.username}</p>
                  <div className="flex items-center gap-2">
                    {comment.updated_at !== comment.created_at && (
                      <span className="italic text-gray-500">[editado]</span>
                    )}
                    <time>{new Date(comment.created_at).toLocaleDateString()}</time>
                  </div>
                </div>

                {/* Contenido del comentario */}
                <ExpandableText
                  text={comment.deleted ? '[comentario eliminado]' : comment.content}
                />
                {renderActions(comment)}
              </div>

              {replyingTo === comment.id && currentUser?.id && (
                <div className="md:ml-4">
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
                <div className="mt-3 md:ml-4">
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

      {/* MODAL DE EDICIÓN */}
      {showModal && commentToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-pop-in w-11/12 max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-black cursor-pointer"
              >
                ✕
              </button>
              <EditCommentForm
                commentId={commentToEdit.id}
                initialContent={commentToEdit.content}
                onSuccess={updatedComment => {
                  setCommentList(prev => updateCommentInTree(prev, updatedComment));
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
