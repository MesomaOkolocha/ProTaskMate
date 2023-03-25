/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      'alkatra': ['Alkatra', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
}