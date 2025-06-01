// src/lib/api/fetcher.js

export async function fetcher(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8 segundos

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    clearTimeout(timeout);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || res.statusText);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('La petición ha tardado demasiado y fue cancelada');
    }
    throw new Error(error.message || 'Error en la conexión con el servidor');
  }
}
