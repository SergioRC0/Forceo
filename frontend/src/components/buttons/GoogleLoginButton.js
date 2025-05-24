'use client';

export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      onClick={() => (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)}
      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-xl shadow transition-colors cursor-pointer btn-animation"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <g>
          <path
            fill="#4285F4"
            d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.27 2.09 30.47 0 24 0 14.82 0 6.73 5.08 2.69 12.44l7.98 6.2C13.01 13.01 18.13 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.85 37.13 46.1 31.39 46.1 24.55z"
          />
          <path
            fill="#FBBC05"
            d="M10.67 28.65c-1.09-3.25-1.09-6.75 0-10l-7.98-6.2C.64 16.36 0 20.09 0 24c0 3.91.64 7.64 2.69 11.55l7.98-6.2z"
          />
          <path
            fill="#EA4335"
            d="M24 48c6.47 0 12.27-2.09 16.85-5.7l-7.19-5.59c-2.01 1.35-4.59 2.14-7.66 2.14-5.87 0-10.99-3.51-13.33-8.65l-7.98 6.2C6.73 42.92 14.82 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </g>
      </svg>
      Iniciar sesión con Google
    </button>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 576c82430619c40f6667af0f04d35c48280fc170
