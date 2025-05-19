/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // añade aquí todas las rutas donde uses clases Tailwind
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)'         },
        },
      },
      animation: {
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
