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
