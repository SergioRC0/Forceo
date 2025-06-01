// ./buttons/PostEditButton.jsx
'use client';
import { Pencil } from 'lucide-react';

export default function PostEditButton({ post, onEdit }) {
  return (
    <button
      onClick={() => onEdit(post)}
      className="text-sm text-indigo-600 hover:underline flex items-center space-x-1"
    >
      <Pencil className="w-4 h-4" />
      <span>Editar</span>
    </button>
  );
}
