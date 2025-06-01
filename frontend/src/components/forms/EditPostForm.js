'use client';

import { useForm } from 'react-hook-form';
import { useEditPost } from '@/hooks/usePosts';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import * as z from 'zod';

const schema = z.object({
  title: z.string().min(5).max(255),
  content: z.string().min(10),
});

export default function EditPostForm({ postId, initialData, onSuccess }) {
  const { editPost, loading } = useEditPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  });

  const onSubmit = async data => {
    const result = await editPost(postId, data);
    if (result.ok) {
      toast.success('Publicación actualizada');
      onSuccess?.(result.data);
    } else {
      toast.error(result.data?.message || 'Error al actualizar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-2xl font-bold mb-4 text-black">Edita la publicación</h3>
      <h4 className="text-xl">
        <span className="user-style">Titulo</span>
      </h4>
      <div>
        <input
          type="text"
          placeholder="Título"
          {...register('title')}
          className="w-full p-2 border rounded text-black"
        />
      </div>
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <h4 className="text-xl">
        <span className="user-style">Contenido</span>
      </h4>
      <div>
        <textarea
          placeholder="Contenido"
          {...register('content')}
          rows={5}
          className="w-full p-2 border rounded text-black h-100"
        />
      </div>

      {errors.content && <p className="text-red-500">{errors.content.message}</p>}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`
          w-full py-3 text-lg font-semibold rounded-lg btn-hover
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          text-white shadow-lg transition 
        `}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
}
