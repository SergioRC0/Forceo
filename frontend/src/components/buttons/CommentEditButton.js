'use client';

import { Pencil } from 'lucide-react';

export default function CommentEditButton({ comment, onEdit }) {
  return (
    <button
      onClick={() => onEdit(comment)}
      className="text-sm text-indigo-600 hover:underline flex items-center space-x-1 cursor-pointer"
    >
      <Pencil className="w-4 h-4" />
      <span>Editar</span>
    </button>
  );
}
