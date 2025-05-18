// src/lib/api/fetcher.js

export async function fetcher(endpoint, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    credentials: 'include', // enviar automáticamente cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // 1º spread: mezcla cabeceras extra
    },
    ...options, // 2º spread: mezcla cualquier otra opción (method, body, etc.)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || res.statusText);
  }
  return data;
}
