import Link from "next/link";
import Image from "next/image";
import AuthLinks from "@/components/AuthLinks";
import UserMenu from "@/components/UserMenu"; // componente cliente para el menú desplegable
//este header define la página según el usuario esté autenticado o no
export default function Header({ isAuthenticated }) {    
  return (
    <header className="w-full flex justify-between items-center p-1 border-b border-gray-200 bg-mycolor-custom">
      <div className="title-style"><Link href="/">Forceo</Link></div>

      {!isAuthenticated ? (
        <div className="flex gap-3 mr-5">
          <AuthLinks />
        </div>
      ) : (
        <UserMenu user={isAuthenticated} />
      )}
    </header>
  );
}
