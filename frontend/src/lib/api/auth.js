// src/lib/api/auth.js
import { fetcher } from './fetcher';

export function loginUser(credentials) {
  // El fetcher ya añade credentials: 'include', Content-Type, parsea JSON y lanza errores
  return fetcher('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function logoutUser() {
  return fetcher('/api/auth/logout', {
    method: 'POST',
  });
}

export function registerUser(data) {
  return fetcher('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
