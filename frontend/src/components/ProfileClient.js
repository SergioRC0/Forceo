'use client';
import { useState } from 'react';
import CreatePostForm from './forms/CreatePostForm';
import { createPost } from '@/lib/api/posts';
import toast from 'react-hot-toast';
import UserPosts from './UserPosts';

export default function ProfileClient({ initialUser, initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  console.log(initialPosts);
  const [showModal, setShowModal] = useState(false);

  if (!initialUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-600 text-xl font-semibold">No se pudo cargar el usuario.</p>
      </div>
    );
  }

  const onSubmit = async postData => {
    const { ok, data } = await createPost(postData);
    if (ok) {
      setPosts(prev => [data, ...prev]);
      setShowModal(false);
      toast.success('¡Publicación creada!');
    } else {
      toast.error('Error: ' + data.message);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <header className="max-w-3xl mx-auto text-center pt-24 pb-12 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          ¡Hola, {initialUser.username}!
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Aquí podrás publicar todo lo que te apetezca. <br />
          ¿A qué esperas?
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="
            px-8 py-4 text-lg font-bold 
            bg-white text-indigo-600 rounded-full 
            shadow-xl hover:shadow-2xl
            btn-hover
            transform hover:scale-105 
            transition duration-300
            animate-pulse cursor-pointer
          "
        >
          Crear tu publicación
        </button>
      </header>

      {/*publicaciones */}
      <UserPosts posts={posts} />

      {/* Overlay */}
      {showModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 backdrop:-blur-sm flex items-center justify-center z-50">
          <div className=" animate-pop-in w-11/12 max-w-lg mx-auto ">
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className=" absolute top-4 right-4 text-black   cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4 text-black">Nueva publicación</h3>
              <CreatePostForm onPostCreated={onSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
