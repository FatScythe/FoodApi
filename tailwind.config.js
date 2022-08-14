/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html, js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#f1e7cff8',
          200: '#888883',
          300: '#f1dcdc',
        }
      },
      fontSize: {
        fahm: '12rem',
      },
      fontFamily: {
        body: ['Nunito']
      }
    },
  },
  plugins: [],
}
