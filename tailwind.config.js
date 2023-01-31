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
      colors: {
        primary: "#560bad",
        "primary-light": "#7209b7",
        secondary: "#4361ee",
        "secondary-light": "#4895ef",
        tertiary: "#4cc9f0",
      },
      grayscale: {
        50: '50%',
      }
    },
  },
  plugins: [],
}
