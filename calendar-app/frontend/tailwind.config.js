/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        'primary-100': '#e8f0fe',
        'border-gray': '#dadce0',
        'subtle-gray': '#f8f9fa',
        'text-primary': '#3c4043',
        'text-secondary': '#5f6368',
      },
    },
  },
}
