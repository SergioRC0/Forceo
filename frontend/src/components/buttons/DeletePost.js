'use client';
import { Trash2Icon } from 'lucide-react';
import { useDeletePost } from '@/hooks/useAuth';

export default function DeletePost({ postId }) {
  const { deletePost, loading } = useDeletePost();

  const handleDelete = () => {
    deletePost(postId);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className=""
    >
      {loading ? '' : <Trash2Icon className="w-5 h-5 cursor-pointer"/>}
    </button>
  );
}
