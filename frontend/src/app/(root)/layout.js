import React from 'react'
import Header from '@/components/Header';
import { cookies } from 'next/headers';

export default async function Layout ({children, hideOverflow=false}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const isAuthenticated = Boolean(token);

  return (
    <div className="h-[100dvh]"> {/*este div controla todo el height de la pagi na*/}
      <nav className='w-full fixed '>
          <Header isAuthenticated={isAuthenticated}/>
      </nav>
      <section className="h-[100dvh] flex flex-grow" >
        <main className={`basis-4/4 p-17 bg-mycolor-main ${hideOverflow ? 'overflow-hidden' : 'overflow-y-auto'}`}>{children}</main>
      </section>
    </div>
  );
}

