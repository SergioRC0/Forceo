// components/buttons/DeletePost.jsx
'use client';
import { Loader2 } from 'lucide-react';
import { Trash2Icon } from 'lucide-react';
import { useDeletePost } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export default function DeletePost({ postId, onDeleted }) {
  const { deletePost, loading } = useDeletePost();

  const handleDelete = async () => {
    try {
      const { ok, data } = await deletePost(postId);
      if (ok) {
        toast.success('¡Publicación eliminada!');
        onDeleted(postId);
      } else {
        toast.error('Error: ' + (data?.message || 'no especificado'));
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1 rounded hover:bg-red-700 hover:text-white transition cursor-pointer"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin left" /> : <Trash2Icon className="" />}
    </button>
  );
}
