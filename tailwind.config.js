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
          dark: "#2A3140",
          DEFAULT: "#1E2328",
        },
        gray: {
          DEFAULT: "#A3A3A3",
          light: "#B7B5B1",
          dark: "#272D35",
        },
        yellow: "#8EBAFB",
        orange: "#174FE2",
        brown: "#7681DE",
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
  plugins: [require("tailwind-scrollbar")],
};
