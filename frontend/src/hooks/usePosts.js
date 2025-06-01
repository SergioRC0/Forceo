'use client';
import { useState } from 'react';
import { deletePostApi, createPost, updatePost, updateComment } from '@/lib/api/posts';

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
export function useEditPost() {
  const [loading, setLoading] = useState(false);

  async function editPost(postId, updatedData) {
    setLoading(true);
    try {
      const res = await updatePost(postId, updatedData);
      return res; // ya está estructurado como { ok, data }
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { editPost, loading };
}
export function useEditComment() {
  const [loading, setLoading] = useState(false);

  async function editComment(commentId, content) {
    setLoading(true);
    try {
      const res = await updateComment(commentId, content);
      return res;
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { editComment, loading };
}
