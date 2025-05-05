'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserMenu({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)}>
        <Image
          src="/user-icon.png"
          alt="Perfil"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-50">
          <p className="px-2 py-1 text-sm">Hola, {user.username}</p>
          <Link href="/profile" className="block px-2 py-1 hover:bg-gray-100 text-sm">Perfil</Link>
          <Link href="/settings" className="block px-2 py-1 hover:bg-gray-100 text-sm">Configuración</Link>
          <form action="/logout" method="POST">
            <button type="submit" className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm">Cerrar sesión</button>
          </form>
        </div>
      )}
    </div>
  );
}
