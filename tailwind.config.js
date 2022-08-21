/* eslint-disable global-require */
/* eslint-disable indent */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/Recipes_App/index.html', './src/RockPaperScissorsGame/index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
};
