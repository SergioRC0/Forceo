import React from 'react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import toast from 'react-hot-toast';

export default function DeleteComment({ commentId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDeleted(commentId); //
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleDelete}
        className=" rounded hover:bg-red-700 hover:text-white transition cursor-pointer"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin left" /> : <Trash2Icon />}
      </button>
    </div>
  );
}
