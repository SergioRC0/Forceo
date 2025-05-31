// app/page.jsx
import HomeClient from '@/components/HomeClient';

import { cookies } from 'next/headers';
export default async function Home({ searchParams }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');
  const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
    credentials: 'include',
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  const asyncParams = await searchParams;
  const category = asyncParams?.category || 'Todas';

  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/api/postsPublic/postsPublic` +
    (category !== 'Todas' ? `?category=${category}` : '');

  const res = await fetch(url, { cache: 'no-store' });
  const posts = res.ok ? await res.json() : [];

  // Simula los enums Prisma si no los quieres hardcodear
  const categories = ['BALONCESTO', 'FUTBOL', 'TENIS'];
  const data = await resUser.json();
  const user = resUser.ok ? data.user : null;
  return <HomeClient categories={categories} posts={posts} user={user} />;
}
