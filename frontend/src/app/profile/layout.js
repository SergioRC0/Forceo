
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Layout from '@/app/(root)/layout'

export default async function ProfileLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) redirect('/login');

    return (
    <Layout>
      {children}
    </Layout>
    );
}
