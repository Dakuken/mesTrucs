/* eslint-disable global-require */
/* eslint-disable indent */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/Recipes_App/index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
};
