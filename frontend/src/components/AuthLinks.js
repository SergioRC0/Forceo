'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLinks() {
  const pathName = usePathname();

  if (pathName === '/login') {
    return (
      <Link href="/register" className="btn-style mr-4 btn-link">
        Registrarse
      </Link>
    );
  }

  if (pathName === '/register') {
    return (
      <Link href="/login" className="btn-style mr-4 btn-link">
        Iniciar sesión
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login" className="btn-style btn-link">
        Iniciar sesión
      </Link>
      <Link href="/register" className="btn-style btn-link">
        Registrarse
      </Link>
    </div>
  );
}
