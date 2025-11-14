/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // optional, if you want dark/light toggle
  theme: {
    extend: {
      colors: {
        primary: "#E50914", // Netflix red
        accent: "#00FFF5",  // Neon cyan
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 15px #00FFF5",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "nav": "64px", // For offset padding under fixed nav
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"), // for styling inputs
    require("@tailwindcss/typography"), // if you use prose
  ],
};