// components/forms/CreatePostForm.js
'use client';
import { usePost } from '@/hooks/useAuth';
import { useState } from 'react';

export default function CreatePostForm({ onPostCreated }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'BALONCESTO' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(category => ({ ...category, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await onPostCreated(form); // <— aquí usas el mismo patrón
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoría
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
            mt-1 block w-full
            border border-gray-300 rounded-lg
            p-3 bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          >
            <option value="BALONCESTO">Baloncesto</option>
            <option value="FUTBOL">Fútbol</option>
            <option value="TENIS">Tenis</option>
          </select>
        </label>
      </div>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="
            mt-1 block w-full
            border border-gray-300 rounded-lg
            p-3 bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          />
        </label>
      </div>

      {/* Contenido */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contenido
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={5}
            className="
            mt-1 block w-full
            border border-gray-300 rounded-lg
            p-3 bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
          />
        </label>
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
        {loading ? 'Creando…' : 'Crear publicación'}
      </button>
    </form>
  );
}
