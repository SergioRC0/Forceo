'use client';
import { useState, useRef, useEffect } from 'react';
import { useCooldown } from '../Comments/CommentSection';

export default function CommentForm({ parentId = null, onCommentPosted }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { inCooldown, secondsLeft } = useCooldown();

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim() || loading || inCooldown) return;
    setLoading(true);
    try {
      await onCommentPosted(parentId, content);
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2 text-black">
      <label>
        <textarea
          name="comment"
          id="comment"
          ref={textareaRef}
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={loading || inCooldown}
          placeholder={inCooldown ? `Espera ${secondsLeft}s` : 'Escribe tu comentario…'}
          className="w-full p-2 border rounded resize-none overflow-hidden"
        />
      </label>
      <button
        type="submit"
        disabled={loading || inCooldown || !content.trim()}
        className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50 btn-hover m-2 text-white font-semibold"
      >
        {loading ? 'Publicando…' : inCooldown ? `Espera ${secondsLeft}s` : 'Publicar comentario'}
      </button>
    </form>
  );
}
