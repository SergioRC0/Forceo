'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import LikeButton from '../buttons/LikeButton';
import CommentEditButton from '../buttons/CommentEditButton';
import DeleteComment from '../buttons/DeleteComment';
import ActionMenu from '../ui/ActionMenu';
export default function CommentActions({
  comment,
  currentUser,
  onEdit,
  onDelete,
  onReply,
  showReply = false,
  isReplying = false,
}) {
  const isOwner = currentUser?.id === comment.user?.id && !comment.deleted;

  return (
    <div className="flex justify-between items-center text-black relative w-full">
      {/* Acciones a la izquierda */}
      <div className="flex items-center space-x-4">
        {/* Like */}
        <LikeButton
          itemId={comment.id}
          type="comment"
          isLiked={comment.comment_likes?.some(like => like.user_id === currentUser?.id)}
          totalLikes={comment.comment_likes?.length ?? 0}
          isAuthenticated={!!currentUser}
          disabled={comment.deleted}
        />

        {/* Respuestas */}
        <div className="flex items-center space-x-1">
          <Link href={`/post/${comment.post_id}#comentarios`}>
            <MessageCircle className="w-5 h-5 cursor-pointer text-black hover:text-indigo-600" />
          </Link>
          <span>{comment.replies?.length ?? 0}</span>
        </div>

        {/* Botón Responder visible solo en escritorio */}
        {showReply && currentUser && !comment.deleted && (
          <div className="hidden sm:block">
            <button className="text-sm text-indigo-600 hover:underline" onClick={onReply}>
              {isReplying ? 'Cancelar' : 'Responder'}
            </button>
          </div>
        )}

        {/* Editar solo en escritorio */}
        {isOwner && (
          <div className="hidden sm:flex items-center">
            <CommentEditButton comment={comment} onEdit={onEdit} />
          </div>
        )}

        {/* Menú móvil: Editar/Eliminar/Responder */}
        {(isOwner || showReply) && (
          <div className="sm:hidden">
            <ActionMenu
              actions={[
                {
                  label: isReplying ? 'Cancelar' : 'Responder',
                  onClick: () => onReply?.(),
                  hidden: !(showReply && currentUser && !comment.deleted),
                  className: 'text-indigo-600 hover:bg-indigo-50',
                },
                {
                  label: 'Editar',
                  onClick: () => onEdit?.(comment),
                  hidden: !isOwner,
                },
                {
                  label: 'Eliminar',
                  onClick: () => onDelete?.(comment.id),
                  hidden: !isOwner,
                  className: 'text-red-600 hover:bg-red-100',
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Papelera (a la derecha en escritorio) */}
      {isOwner && (
        <div className="hidden sm:block ml-auto">
          <DeleteComment commentId={comment.id} onDeleted={onDelete} />
        </div>
      )}
    </div>
  );
}
