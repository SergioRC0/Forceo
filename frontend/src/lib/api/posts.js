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

export async function deletePostApi(postId) {
  return fetcher(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
}

export async function createCommentApi({ postId, content, parentId }) {
  return fetcher('/api/posts/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, content, parentId }),
  });
}

export async function deleteCommentApi(commentId) {
  return fetcher(`/api/posts/comments/${commentId}`, {
    method: 'DELETE',
  });
}

export async function updatePost(postId, updatedData) {
  try {
    const post = await fetcher(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updatedData),
    });
    return { ok: true, data: post };
  } catch (err) {
    return { ok: false, data: { message: err.message } };
  }
}

export async function updateComment(commentId, content) {
  try {
    const data = await fetcher(`/api/posts/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
    return { ok: true, data };
  } catch (err) {
    // Este error viene de fetcher, que ya lanza con err.message
    return { ok: false, data: { message: err.message } };
  }
}
