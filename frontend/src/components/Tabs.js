import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="max-w-3xl mx-auto px-4 flex justify-center space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-full font-semibold ${
          activeTab === 'posts' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => setActiveTab('posts')}
      >
        Publicaciones
      </button>
      <button
        className={`px-4 py-2 rounded-full font-semibold ${
          activeTab === 'comments' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => setActiveTab('comments')}
      >
        Comentarios
      </button>
    </div>
  );
}
