'use client';

import { useLogout } from '@/hooks/useAuth';

export default function LogoutButton() {
  const { logout, loading } = useLogout();
  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="w-full text-left text-sm px-2 py-1 hover:bg-gray-600 disabled:opacity-50"
    >
      {loading ? 'Cerrando sesión…' : 'Cerrar sesión'}
    </button>
  );
}
