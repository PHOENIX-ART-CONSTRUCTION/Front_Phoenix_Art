/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
      },
      colors: {
        phoenixBlue: '#0033A0', // Assure-toi d'ajouter ces couleurs dans ta palette
        phoenixGray: '#6E6E6E',
        phoenixRed: '#C8102E',
      },
    },
  },
  plugins: [],
}
