/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      krona: ['Krona One', 'Roboto', 'sans-serif'],
      luckiestGuy: ['Luckiest Guy', 'Roboto', 'serif'],
    },
    extend: {
      colors: {
        background: '#f4f4f1',
        pink: '#CA4F79',
      },
    },
  },
  plugins: [require('daisyui')],
};
