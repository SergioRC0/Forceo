import { fetcher } from './fetcher';

export async function createPost(data) {
  try {
    const post = await fetcher('/api/posts/createPost', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { ok: true, data: post };
  } catch (err) {
    return { ok: false, data: { message: err.message } };
  }
}

export async function deletePost(postId) {
  try {
    const post = await fetcher(`/api/posts/${postId}`, {
      method: 'DELETE',  // <- Método HTTP correcto para borrar
      body: JSON.stringify(postId),
    });
    return { ok: true, data: post };
  } catch (err) {
    return { ok: false, data: { message: err.message } };
  }
}