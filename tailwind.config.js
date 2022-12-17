/** @type {import('tailwindcss').Config} */

const { colors } = require("tailwindcss/defaultTheme");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        black: {
          dark: "#0C0E12",
          DEFAULT: "#1E2328",
        },
        gray: {
          DEFAULT: "#A3A3A3",
          light: "EAECEF",
          dark: "#292E33",
        },
        yellow: "#F2D74C",
        orange: "#FF7914",
        brown: "#C6A150",
      },
      fontFamily: {
        sans: ["Rosario", ...fontFamily.sans],
      },
      keyframes: {
        "buoyancy-1": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "buoyancy-2": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      animation: {
        "buoyancy-1": "buoyancy-1 2s ease-in-out infinite",
        "buoyancy-2": "buoyancy-2 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
