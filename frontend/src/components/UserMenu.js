'use client';
import { User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from './buttons/LogoutButton';

export default function UserMenu({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  // Hook que cierra el menú al clickar fuera
  useEffect(() => {
    if (!showMenu) return;
    function handleClickOutside(e) {
      // si el menú está abierto y el click no está dentro de wrapperRef, lo cerramos
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    // sólo mientras el menú esté abierto queremos escuchar
    document.addEventListener('pointerup', handleClickOutside);
    return () => {
      document.removeEventListener('pointerup', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className=" mr-5" ref={wrapperRef}>
      <button onClick={() => setShowMenu(open => !open)}>
        <User />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-md rounded-lg p-2 z-50 pointer-events-auto">
          <p className="block px-2 py-1 text-2xl">{user.username}</p>
          <Link href="/profile" className="block px-2 py-1 hover:bg-gray-600 text-sm">
            Perfil
          </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
