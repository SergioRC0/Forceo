import React from 'react';
import Header from '@/components/Header';
import { cookies } from 'next/headers';

export default async function Layout({ children, hideOverflow = false }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;

  if (token) {
    // Llamo al endpoint Express que devuelve el user actual
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      cache: 'no-store',
      headers: { Cookie: `token=${token}` },
    });
    if (res.ok) {
      const { user: currentUser } = await res.json();

      console.log('perfil extraído:', currentUser);
      user = currentUser;
    }
  }

  return (
    <div className="h-[100dvh]">
      {/*este div controla todo el height de la pagi na*/}
      <nav className="w-full fixed z-50 ">
        <Header user={user} />
      </nav>
      <section className="h-[100dvh] flex flex-grow">
        <main
          className={`basis-4/4 p-17 bg-mycolor-main ${
            hideOverflow ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {children}
        </main>
      </section>
    </div>
  );
}
