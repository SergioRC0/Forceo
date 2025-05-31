// src/app/post/[postId]/PostClient.js
'use client';

import CommentSection from './Comments/CommentSection';
import PostCardUser from './Post/PostCardUser';

export default function PostClient({ post, initialComments, user }) {
  return (
    <main className="min-h-screen py-12 px-4">
      {/* Post */}
      <PostCardUser post={post} currentUser={user} />

      {/* Comentarios */}
      <CommentSection postId={post.id} initialComments={initialComments} user={user} />
    </main>
  );
}
