/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [require("tailwindcss")],
}
