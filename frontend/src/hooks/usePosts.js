'use client';
import { useState } from 'react';
import { deletePostApi, createPost } from '@/lib/api/posts';

export function usePost() {
  const [loading, setLoading] = useState(false);

  async function post(data) {
    setLoading(true);
    try {
      const res = await createPost(data);
      return { ok: true, res };
    } catch (err) {
      return { ok: false, res: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { post, loading };
}

export function useDeletePost() {
  const [loading, setLoading] = useState(false);

  async function deletePost(postId) {
    setLoading(true);
    try {
      const data = await deletePostApi(postId);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { deletePost, loading };
}
