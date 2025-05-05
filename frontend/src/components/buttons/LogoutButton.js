'use client';
import { handleLogout } from "@/handlers/handleLogoutSubmit";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
  return (
    <button
      className="mt-6 border px-4 py-2  text-white bg-black btn-hover"
      onClick={() => handleLogout(router)} //de esta manera solo ejecutamos la funcion al hacer click
    >
      Cerrar sesión
    </button>
  );
}
