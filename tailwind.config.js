/** @type {import('tailwindcss/types/generated/colors').DefaultColors} */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: colors.stone[900],
        lite: colors.stone[50],
      },

      backgroundColor: {
        frame: colors.stone[100],
        button: colors.stone[200],
        danger: colors.red[500],
      },

      textColor: {
        link: colors.blue[500],
      },
    },
  },
  plugins: [require("tailwind-children")],
};
