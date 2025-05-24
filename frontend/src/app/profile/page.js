import { cookies } from 'next/headers';
import ProfileClient from '@/components/ProfileClient';

export default async function ProfilePage() {
  // Reconstruye la cookie header para tu API
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  // 1) Fetch de los datos del usuario autenticado
  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  const { user: initialUser } = await userRes.json();

  if (!initialUser) {
    return <p>No estás autenticado</p>;
  }

  // 2) Fetch de los posts de ese usuario
  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/listPosts`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  const initialPosts = postsRes.ok ? await postsRes.json() : [];

  return (
    <ProfileClient
      key={initialPosts.length}
      initialUser={initialUser}
      initialPosts={initialPosts}
    />
  );
}
