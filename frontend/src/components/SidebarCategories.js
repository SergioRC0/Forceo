'use client';
import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const prettyName = cat => {
  switch (cat) {
    case 'BALONCESTO':
      return '🏀 Baloncesto';
    case 'FUTBOL':
      return '⚽ Fútbol';
    case 'TENIS':
      return '🎾 Tenis';
    default:
      return cat;
  }
};

export default function SidebarCategories({ categories }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('category');

  const toggleSidebar = () => setOpen(!open);

  const handleSelect = category => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'Todas') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    router.push(`/?${params.toString()}`);
    setOpen(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-all"
      >
        <Filter className="inline-block w-4 h-4 mr-2" />
        Categorías
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full pt-20 bg-white border-r border-gray-300 shadow-lg z-40 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Encabezado con botón cerrar */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div></div>
          <button onClick={toggleSidebar}>
            <X className="w-5 h-5 text-gray-700 hover:text-black" />
          </button>
        </div>

        {/* Lista de categorías */}
        <ul className="p-4 space-y-2 text-black font-medium">
          {['Todas', ...categories].map(category => {
            const isActive = (category === 'Todas' && !selected) || selected === category;
            return (
              <li key={category}>
                <button
                  onClick={() => handleSelect(category)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'hover:bg-indigo-50 cursor-pointer '
                  }`}
                >
                  {category === 'Todas' ? '🧭 Todas' : prettyName(category)}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
