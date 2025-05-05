import { cookies } from 'next/headers';
import ProfileClient from '@/components/ProfileClient';
import { redirect } from 'next/navigation';

//En este SC hacemos fetch del usuario usando las cookies y pasamos al componente cliente initialUser, en su componente vemos que lo necesita de parametro

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c)=>`${c.name}=${c.value}`).join('; ');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: cookieHeader // Hay que settear esto para enviar las cookies desde el servidor de Next.js
    },
    cache: 'no-store',
  });
  const data = await res.json();
  const initialUser = data?.user || null;

  return <ProfileClient initialUser={initialUser} />;
}
