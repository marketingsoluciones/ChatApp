const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      "sans": ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      primary: "#F7628C",
      secondary: "#87F3B5",
      tertiary: "#FBFF4E",
      base: "#F2F2F2",
      gray: {
        100: "#DFDFDF",
        200: "#727272",
        300: "#444444"
      },
      white: "#FFFFFF",
      black: "#000000",
      red: "#EF4444",
      green: "#34D399",
      rose: {
        100: "#fae3e6"
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 
