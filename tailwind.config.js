/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Set Inter as the default sans-serif font
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // A nice indigo
          'hover': '#4338CA',
        },
        secondary: '#10B981', // A vibrant green
      },
      keyframes: {
        'fade-in': {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
        },
    },
    animation: {
        'fade-in': 'fade-in 0.5s ease-out',
    },

    },
  },
  plugins: [],
}