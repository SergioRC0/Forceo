'use client';

import LogoutButton from '@/components/buttons/LogoutButton';
import Header from '@/components/Header'
//aqui insertamos el header que es donde pasamos initialUser como prop

export default function ProfileClient({ initialUser }) {
  if (!initialUser) return <p>No se pudo cargar el usuario.</p>;

  return (
    <div>
      <div className='p-10'>
        <h1 className="text-3xl font-bold mb-4">Hola, {initialUser.username}</h1>
        <p>Email: {initialUser.email}</p>
        <LogoutButton />
      </div>
    </div>
  );
}
