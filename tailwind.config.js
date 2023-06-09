const { colors, spacing } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      "sans": ['Poppins', ...defaultTheme.fontFamily.sans],
      "Roboto": ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        ...colors,
        primary: "#F7628C",
        secondary: "#87F3B5",
        tertiary: "#49516F",
        "color-base": "#F2F2F2",
        green: "#13ce66",
        rose:"#FE8D99",
        white:"#ffffff"
      },
      transitionProperty: {
        'height': 'height'
      },
      spacing:{
        '250':'250px',
        '215':'215px',
        '15':'15px',

      }
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [],
} 
