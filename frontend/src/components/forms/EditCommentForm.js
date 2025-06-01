'use client';

import { useForm } from 'react-hook-form';
import { useEditComment } from '@/hooks/usePosts';
import toast from 'react-hot-toast';

export default function EditCommentForm({ commentId, initialContent, onSuccess }) {
  const { editComment, loading } = useEditComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { content: initialContent },
  });

  const onSubmit = async data => {
    const result = await editComment(commentId, data.content);
    if (result.ok) {
      toast.success('Comentario actualizado');
      onSuccess?.(result.data);
    } else {
      toast.error(result.data?.message || 'Error al actualizar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contenido */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-black">Editar comentario</h3>

          <textarea
            {...register('content', {
              required: 'El contenido es obligatorio',
              minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
            })}
            rows={5}
            className="
              mt-1 block w-full
              border border-gray-300 rounded-lg
              p-3 bg-white text-gray-900
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition h-100
            "
          />
        </label>
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 text-lg font-semibold rounded-lg btn-hover
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          text-white shadow-lg transition
        `}
      >
        {loading ? 'Actualizando...' : 'Actualizar comentario'}
      </button>
    </form>
  );
}
