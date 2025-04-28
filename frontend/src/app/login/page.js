import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
              <div className="flex items-center justify-between gap-3 px-2 sm:px-0">
                <button className="text-xl text-black">&#9776;</button>
                <div>⚫</div>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="hover:text-black  transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 border border-black text-gray-500 px-4 py-1 rounded-xl cursor-pointer max-md:hidden whitespace-nowrap"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className=" hover:text-black transition  duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 border border-black text-gray-500 px-4 py-1 rounded-xl cursor-pointer max-md:hidden whitespace-nowrap"
                >
                  Registrarse
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis-vertical min-md:hidden"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-10 flex-grow flex flex-col bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50">
        <div className="flex text-7xl items-center justify-center mt-5 mb-15">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300 bg-clip-text text-transparent drop-shadow-md">
            Forceo
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center md:mb-30">
          <form className="w-full max-w-md p-6 rounded-xl shadow-xl space-y-4 mx-4 bg-white">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-black">Conéctate</h2>
            </div>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border rounded-xl px-3 py-2 border-black text-black"
            />
            <p className="text-blue-400 hover:text-blue-700 cursor-pointer">
              ¿Has olvidado la contraseña?
            </p>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black transition  duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-blue-400 to-green-300  hover:text-black rounded-xl cursor-pointer font-bold "
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-7 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400 border-gray-200">
        <div className="flex gap-3 justify-center">
          <span className="">X</span>
          <span className="">📷</span>
          <span>🎥</span>
          <span>🔗</span>
        </div>
        <div className="text-center space-y-3">
          <p className="font-bold">Use cases</p>
          <p>UI design</p>
          <p>UX design</p>
          <p>Wireframing</p>
          <p>Diagramming</p>
        </div>
        <div className="text-center space-y-3">
          <p className="font-bold">Resources</p>
          <p>Blog</p>
          <p>Colors</p>
          <p>Support</p>
          <p>Developers</p>
        </div>
      </footer>
    </div>
  );
}
