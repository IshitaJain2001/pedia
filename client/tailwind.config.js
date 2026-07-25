/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          sky: '#8FD8FF',
          mint: '#D8F8E1',
          yellow: '#FFEAA7',
          peach: '#FFD8C2',
        },
        accent: {
          coral: '#FF6B6B',
          lavender: '#A78BFA',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
