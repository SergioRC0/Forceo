// components/Comment/CommentSection.jsx
'use client';
import CommentForm from '../forms/CommentForm';
import CommentTree from './CommentTree';
import { useComments } from '@/hooks/useComments';
import AuthLinks from '../AuthLinks';
import { createContext, useContext } from 'react';

export const CooldownContext = createContext();
export function useCooldown() {
  return useContext(CooldownContext);
}
export default function CommentSection({ postId, initialComments, user }) {
  const { comments, addComment, deleteComment, inCooldown, secondsLeft, countAll } = useComments(
    postId,
    initialComments,
    user
  );

  return (
    <CooldownContext.Provider value={{ inCooldown, secondsLeft }}>
      <section className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow p-6">
        <h2 id="comentarios" className="text-2xl font-bold text-black">
          Comentarios ({countAll(comments)})
        </h2>
        {user ? (
          <CommentForm onCommentPosted={addComment} />
        ) : (
          <div className="border p-4 rounded bg-gray-50 text-center space-y-2 m-2">
            <p className="text-gray-700">Debes iniciar sesión para comentar.</p>
            <div className="flex justify-center space-x-4">
              <AuthLinks />
            </div>
          </div>
        )}
        {comments.length ? (
          <CommentTree
            comments={comments}
            currentUser={user}
            onCommentPosted={addComment}
            onCommentDeleted={deleteComment}
          />
        ) : (
          <p className="italic text-gray-500 mt-4">Aún no hay comentarios.</p>
        )}
      </section>
    </CooldownContext.Provider>
  );
}
