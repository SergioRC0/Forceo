// src/hooks/useAuth.js
'use client';
import { useState } from 'react';
import { loginUser, logoutUser, registerUser } from '@/lib/api/auth';
import { deletePostApi } from '@/lib/api/posts';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [loading, setLoading] = useState(false);

  async function login(creds) {
    setLoading(true);
    try {
      const data = await loginUser(creds);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setLoading(true);
    try {
      await logoutUser();
      router.push('/login');
      return { ok: true };
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading };
}

export function useRegister() {
  const [loading, setLoading] = useState(false);

  async function registerU(data) {
    setLoading(true);
    try {
      const res = await registerUser(data);
      return { ok: true, data: res };
    } catch (err) {
      return { ok: false, data: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }

  return { registerU, loading };
}

export function usePost() {
  const [loading, setLoading] = useState(false);

  async function post(data) {
    setLoading(true);
    try {
      const res = await createPost(data);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, data: { message: err.message } };
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
