'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then((data) => {
        console.log('Respuesta de backend:', data); 
        setUsuarios(data);
      })
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);



  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
              <div className="flex items-center justify-between gap-3 px-2 sm:px-0">
                <button className="text-xl text-black">&#9776;</button>
                <div>⚫</div>
              </div>
              <div className="flex items-center gap-6">
              <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2 border border-gradient-to-r from-indigo-500 via-blue-400 to-green-300 rounded-xl "
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
                <Link
                  href="/login"
                  className="hover:text-black  transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 border border-black text-gray-500 px-4 py-1 rounded-xl cursor-pointer max-md:hidden whitespace-nowrap"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className=" hover:text-black transition  duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 border border-black text-gray-500 px-4 py-1 rounded-xl cursor-pointer max-md:hidden whitespace-nowrap"
                >
                  Registrarse
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis-vertical min-md:hidden"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-10 flex-grow flex flex-col bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50">
        <div className="flex text-7xl items-center justify-center ">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 bg-clip-text text-transparent drop-shadow-md">
            Forceo
          </h1>
          </div>
          <div className="flex items-center justify-center ">
            <h1 className='text-black'>Lista de usuarios</h1>
            <ul className='block text-black'>{usuarios.map((u) => (<li key={u.id}>{u.username}</li>))}
            </ul>
          </div>
      </main>
    </div>
  );
}
