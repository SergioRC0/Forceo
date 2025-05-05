import React from 'react'
import Layout from '../(root)/layout'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginLayout({children}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(token) redirect('/profile');

  return (
    <div>
      <Layout hideOverflow>{children}</Layout>
    </div>
  )
}
