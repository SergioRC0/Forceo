import React from 'react';
import SidebarCategories from './SidebarCategories';
import PostCard from './Post/PostCard';
export default function HomeClient({ categories, posts, user }) {
  return (
    <div>
      <main className="min-h-screen py-12 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:mt-8 font-extrabold title-style mb-4">Comunidad Forceo</h1>
          <p className="text-lg">
            Explora las publicaciones de nuestra comunidad. ¡Encuentra algo que te inspire!
          </p>
        </div>

        {/* Filtro de categorías */}
        <SidebarCategories categories={categories} />

        {/* Posts */}
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <PostCard key={post.id} post={post} currentUserId={user} />
              ))}
            </ul>
          ) : (
            <p className="text-center italic text-gray-500">No hay publicaciones.</p>
          )}
        </div>
      </main>
    </div>
  );
}
