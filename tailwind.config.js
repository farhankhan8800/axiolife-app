const { TYPO } = require('./src/assets/typo');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./App.{js,jsx,ts,tsx}",      
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: TYPO.colors.axiocolor,
        dark: TYPO.colors.dark,
        light_gray: TYPO.colors.light_gray,
        light: TYPO.colors.light,
        dark_blue: TYPO.colors.dark_blue,
        error: TYPO.colors.error
      },
      fontFamily: {
        mulish_bold: [TYPO.fontfamily.mulish_bold, 'sans-serif'],
        mulish_exbold: [TYPO.fontfamily.mulish_exbold, 'sans-serif'],
        mulish_exlight: [TYPO.fontfamily.mulish_exlight, 'sans-serif'],
        mulish_italic: [TYPO.fontfamily.mulish_italic, 'sans-serif'],
        mulish_light: [TYPO.fontfamily.mulish_light, 'sans-serif'],
        mulish_medium: [TYPO.fontfamily.mulish_medium, 'sans-serif'],
        mulish_regular: [TYPO.fontfamily.mulish_regular, 'sans-serif'],
        mulish_semibold: [TYPO.fontfamily.mulish_semibold, 'sans-serif'],
      },
    },
  },
  plugins: [],
};