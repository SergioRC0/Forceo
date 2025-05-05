'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLinks() {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false); //problemas de Hydration porque no matcheaba el server con el cliente

  useEffect(() => {       //con useEffect y useState espremos a que el componente se monte en el cliente tras el primer render
    setMounted(true);
  }, []);

  // Evitamos render hasta que el componente esté montado para que el html no difiera
  if (!mounted) return null;

  if (pathName === "/login") {
    return <Link href="/register" className="btn-style mr-4">Registrarse</Link>;
  }

  if (pathName === "/register") {
    return <Link href="/login" className="btn-style mr-4">Iniciar sesión</Link>;
  }

  return (
    <>
      <Link href="/login" className="btn-style">Iniciar sesión</Link>
      <Link href="/register" className="btn-style">Registrarse</Link>
    </>
  );
}
