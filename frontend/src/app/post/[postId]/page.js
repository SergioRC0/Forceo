// src/app/post/[postId]/page.jsx
import PostClient from '@/components/PostClient';
import { cookies } from 'next/headers';

export default async function PostPage({ params }) {
  const parame = await params;
  const postId = parame.postId;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const resPost = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postsPublic/getPost/${postId}`,
    {
      cache: 'no-store',
    }
  );
  const resComments = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postsPublic/comment/${postId}`,
    {
      cache: 'no-store',
    }
  );
  const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
    credentials: 'include',
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });

  const [post, comments] = await Promise.all([resPost.json(), resComments.json()]);
  const data = await resUser.json();
  const user = resUser.ok ? data.user : null;
  console.log('Current user', user);
  return <PostClient post={post} initialComments={comments} user={user} />;
}
