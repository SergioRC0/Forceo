// src/app/post/[postId]/PostClient.js
'use client';

import CommentSection from '../Comments/CommentSection';
import PostCardUser from './PostCardUser';

export default function PostClient({ post, initialComments, user }) {
  return (
    <main className="min-h-screen mt-8 sm:mt-16 px-4 py-6 sm:px-10 md:px-20 lg:px-32 xl:px-48">
      {/* Post */}
      <PostCardUser post={post} currentUser={user} />

      {/* Comentarios */}
      <CommentSection postId={post.id} initialComments={initialComments} user={user} />
    </main>
  );
}
