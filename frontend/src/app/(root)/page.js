// app/page.jsx  (o pages/index.jsx)
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  // 1) Trae las publicaciones públicas
  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postsPublic/postsPublic`, {
    cache: 'no-store',
  });

  const posts = postsRes.ok ? await postsRes.json() : [];
  console.log(posts.json);

  return (
    <main className="min-h-screen py-12 px-4 animate-fade-in">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-12 ">
        <h1 className="text-5xl font-extrabold title-style mb-4">Comunidad Forceo</h1>
        <p className="text-lg">
          Explora las últimas publicaciones de nuestra comunidad. ¡Encuentra algo que te inspire!
        </p>
      </div>

      {/* Grid de cartas */}
      <div className="max-w-7xl mx-auto">
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <li
                key={post.id}
                className="
                  bg-white rounded-2xl shadow-md 
                  hover:shadow-xl transition-shadow
                  flex flex-col overflow-hidden
                "
              >
                <div className="p-6 flex flex-col flex-grow">
                  {/* Cabecera con categoría y fecha */}
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="
                      text-xs font-semibold uppercase 
                      px-2 py-1 bg-indigo-100 text-indigo-800 
                      rounded-full
                    "
                    >
                      {post.category.toLowerCase()}
                    </span>
                    <time className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>

                  {/* Título y extracto */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    <span className="user-style ">{post.user?.username}</span> {post.title}
                  </h2>
                  <p className="text-gray-600 flex-grow line-clamp-3">{post.content}</p>

                  {/* Leer más */}
                  <Link
                    href={`/posts/${post.id}`}
                    className="
                      mt-4 inline-block text-indigo-600 
                      font-medium hover:underline
                    "
                  >
                    Leer más →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center italic text-gray-500">
            Aún no hay publicaciones en la comunidad.
          </p>
        )}
      </div>
    </main>
  );
}
