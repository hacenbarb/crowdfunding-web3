/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm:'1rem',
        md: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      // colors: {
      //   violte: "#560bad",
      //   "violte-light": "#560bad",
      //   blue: "#4361ee",
      //   "blue-light": "#4895ef",
      //   cyan: "#4cc9f0",
      //   black: "#10002b",
      //   white: "#FEFFFE",
      //   transparent: "transparent",
      // },
    },
  },
  plugins: [],
}
