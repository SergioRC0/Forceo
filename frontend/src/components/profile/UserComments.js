'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCommentApi } from '@/lib/api/posts';
import EditCommentForm from '../forms/EditCommentForm';
import CommentActions from '../Comments/CommentActions';
import ExpandableText from '../ui/ExpandableText';

export default function UserComments({ comments, currentUser }) {
  const [userComments, setUserComments] = useState(comments);
  const [showModal, setShowModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);

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
  const handleUpdate = updated => {
    setUserComments(prev => prev.map(c => (c.id === updated.id ? { ...c, ...updated } : c)));
    setShowModal(false);
  };

  return (
    <main className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-6">Tus Comentarios</h2>

      {userComments.length > 0 ? (
        <ul className="space-y-6 animate-fade-in">
          {userComments.map(comment => (
            <li
              key={comment.id}
              className="relative  bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-l-4 border-indigo-500 rounded-xl shadow-lg transform transition-all duration-300 md:hover:z-20 md:hover:scale-105 md:hover:shadow-2xl "
            >
              <div className="p-6 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span className="user-style text-sm text-black">
                    {comment.user?.username || 'Anónimo'}
                  </span>
                  <div className="flex items-center gap-2">
                    {comment.updated_at !== comment.created_at && (
                      <span className="italic text-gray-500">[editado]</span>
                    )}
                    <time>{new Date(comment.created_at).toLocaleDateString()}</time>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 line-clamp-2">
                  {comment.post?.title ?? '[Post eliminado]'}
                </h1>
                <div className=" p-3 rounded">
                  {/* Título del post relacionado */}

                  {/* Contenido del comentario */}
                  {comment.deleted ? (
                    <p className="italic text-gray-500">[comentario eliminado]</p>
                  ) : (
                    <ExpandableText text={comment.content} />
                  )}
                </div>

                <CommentActions
                  comment={comment}
                  currentUser={currentUser}
                  onEdit={c => {
                    setCommentToEdit(c);
                    setShowModal(true);
                  }}
                  onDelete={() => handleDelete(comment.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center italic text-gray-500">Aún no tienes ningún comentario.</p>
      )}
      {showModal && commentToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
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
                onSuccess={updatedPost => {
                  handleUpdate(updatedPost);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
