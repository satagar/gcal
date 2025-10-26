/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        primary: '#1a73e8',
        'primary-100': '#e8f0fe',
        'border-gray': '#dadce0',
        'subtle-gray': '#f8f9fa',
        'text-primary': '#3c4043',
        'text-secondary': '#5f6368',
      },
      borderRadius: {
        sm: '4px',
      },
    },
  },
  plugins: [],
}
