// src/utils/auth.js


export async function loginUser(credentials) {

  try {
    /* console.log(' Enviando al backend:', credentials); */

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // para enviar y guardar la cookie
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    return { ok: res.ok, data}; //devolvemos el resultado al componente

  } catch (err) {
    console.error('Error en login:', err);
    alert('Error de red o del servidor');
  };
}

export async function logoutUser() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function registerUser(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return { ok: res.ok, data: result };
}