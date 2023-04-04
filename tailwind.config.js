/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode :'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container :{
        center : true,
        padding : '1rem'
      },
      boxShadow: {
        'card': ' 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);',
      },
      minHeight: {
        view :'calc(100vh - 72px)'
      },
      width :{
        fullTable : 'calc(100% + 16px)'
      }
    },
  },
  plugins: [],
}