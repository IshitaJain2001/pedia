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
          olive: '#808000',
          orange: '#FF8C00',
          amber: '#FFBF00',
          warm: '#D2691E',
          cream: '#FFF8DC',
        },
        accent: {
          gold: '#FFD700',
          coral: '#FF7F50',
          peach: '#FFDAB9',
          brown: '#8B4513',
        },
        background: {
          warm: '#FFF5E6',
          cream: '#FFFAF0',
          light: '#FFF8DC',
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
