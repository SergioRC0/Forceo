'use client';

import React, { useState } from 'react';
import LikeButton from '../buttons/LikeButton';
import PostEditButton from '../buttons/PostEditButton';
import EditPostForm from '../forms/EditPostForm';

export default function PostCardUser({ post, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState(post); // local editable
  const [postToEdit, setPostToEdit] = useState(null);

  const handleUpdate = updatedPost => {
    setPostData(updatedPost);
    setShowModal(false);
  };

  const isOwner = currentUser?.id === post.user_id;

  return (
    <article className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
          {postData.category?.toLowerCase()}
        </span>
        <div className="flex items-center gap-2">
          {postData.updated_at && postData.updated_at !== postData.created_at && (
            <span className="text-sm italic text-gray-500">
              {'['}editado{']'}
            </span>
          )}
          <time className="text-xs text-gray-500">
            {new Date(postData.created_at).toLocaleDateString()}
          </time>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-extrabold text-gray-900 break-all">{postData.title}</h1>
      </div>

      <p className="text-sm text-gray-600">
        Publicado por <span className="user-style">{postData.user?.username || 'Anónimo'}</span>
      </p>
      <div className="text-gray-800 break-all">{postData.content}</div>

      <div className="mt-4 flex justify-between items-center text-black">
        <LikeButton
          itemId={postData.id}
          type="post"
          isLiked={postData.post_likes?.some(like => like.user_id === currentUser?.id)}
          totalLikes={postData.post_likes?.length ?? 0}
          isAuthenticated={!!currentUser}
        />

        {isOwner && (
          <PostEditButton
            post={postData}
            onEdit={() => {
              setPostToEdit(postData);
              setShowModal(true);
            }}
          />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-pop-in w-11/12 max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-black cursor-pointer"
              >
                ✕
              </button>
              <EditPostForm
                postId={postToEdit.id}
                initialData={{
                  title: postToEdit.title || '',
                  content: postToEdit.content || '',
                }}
                onSuccess={handleUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
