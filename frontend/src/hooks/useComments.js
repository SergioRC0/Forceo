// src/hooks/useComments.js
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { deleteCommentApi, createCommentApi } from '@/lib/api/posts';
//  Función recursiva
const insertReplyInTree = (comments, parentId, newComment) => {
  return comments.map(c => {
    if (c.id === parentId) {
      return { ...c, replies: [newComment, ...(c.replies || [])] };
    } else if (c.replies?.length) {
      return { ...c, replies: insertReplyInTree(c.replies, parentId, newComment) };
    }
    return c;
  });
};
const markCommentAsDeleted = (comments, commentId) => {
  return comments.map(c => {
    if (c.id === commentId) {
      return { ...c, content: '[comentario eliminado]', deleted: true };
    } else if (c.replies?.length) {
      return { ...c, replies: markCommentAsDeleted(c.replies, commentId) };
    }
    return c;
  });
};

export function useComments(postId, initialComments = []) {
  const [comments, setComments] = useState(initialComments);
  const [unlockAt, setUnlockAt] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Init cooldown desde localStorage
  useEffect(() => {
    const last = parseInt(localStorage.getItem('lastCommentTimestamp') || '0', 10);
    if (last > Date.now()) {
      setUnlockAt(last);
      setSecondsLeft(Math.ceil((last - Date.now()) / 1000));
    }
  }, []);

  // Cuenta atrás del cooldown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const iv = setInterval(() => {
      const rem = Math.ceil((unlockAt - Date.now()) / 1000);
      if (rem <= 0) {
        clearInterval(iv);
        setSecondsLeft(0);
      } else {
        setSecondsLeft(rem);
      }
    }, 500);
    return () => clearInterval(iv);
  }, [secondsLeft, unlockAt]);

  const inCooldown = secondsLeft > 0;

  const countAll = list =>
    list.reduce((sum, c) => sum + 1 + (c.replies ? countAll(c.replies) : 0), 0);

  const addComment = async (parentId, content) => {
    if (!content.trim()) return;

    const newComment = {
      id: `temp-${Date.now()}`,
      parentId,
      content,
      user: {},
      replies: [],
      created_at: new Date().toISOString(),
      post_id: postId,
    };

    // Optimista
    setComments(prev =>
      parentId ? insertReplyInTree(prev, parentId, newComment) : [newComment, ...prev]
    );

    // Cooldown
    const unlock = Date.now() + 5000;
    localStorage.setItem('lastCommentTimestamp', `${unlock}`);
    setUnlockAt(unlock);
    setSecondsLeft(5);

    try {
      const saved = await createCommentApi({ postId, content, parentId });
      toast.success('¡Comentario publicado!');
      setComments(prev => prev.map(c => (c.id === newComment.id ? saved : c)));
    } catch (err) {
      setComments(prev => prev.filter(c => c.id !== newComment.id));
      toast.error('Inténtelo en unos segundos');
    }
  };
  const deleteComment = async commentId => {
    try {
      await deleteCommentApi(commentId);
      // Actualizar localmente
      toast.success('¡Comentario eliminado!');
      setComments(prev => markCommentAsDeleted(prev, commentId));
    } catch (err) {
      console.error('Error al eliminar comentario:', err);
      toast.error('Error del servidor');
    }
  };

  return { comments, addComment, deleteComment, inCooldown, secondsLeft, countAll };
}
