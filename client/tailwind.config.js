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
          green: '#2E7D32',
          light: '#4CAF50',
          lime: '#8BC34A',
          emerald: '#10B981',
          dark: '#1B5E20',
          cream: '#F1F8E9',
        },
        accent: {
          mint: '#69F0AE',
          teal: '#26A69A',
          sage: '#87CEEB',
          forest: '#228B22',
        },
        background: {
          green: '#F1F8E9',
          cream: '#F9FBE7',
          light: '#E8F5E9',
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
