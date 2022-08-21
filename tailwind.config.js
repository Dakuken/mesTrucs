/* eslint-disable global-require */
/* eslint-disable indent */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/index.html', './src/**/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
};
